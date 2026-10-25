import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, X, PhoneCall, PhoneOff, Sparkles, AlertCircle, Radio } from 'lucide-react';

interface VoiceAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VoiceAgentModal({ isOpen, onClose }: VoiceAgentModalProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Ready to connect with Gemini 3.8 Live API');
  const [transcript, setTranscript] = useState<{ sender: 'user' | 'agent'; text: string }[]>([
    {
      sender: 'agent',
      text: "Hello! I am Abhidhab's AI Voice Assistant powered by Gemini 3.8 Live. Ask me anything about Abhidhab's engineering experience, microservices, or AI projects.",
    },
  ]);

  const wsRef = useRef<WebSocket | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const audioQueueRef = useRef<AudioBufferSourceNode[]>([]);
  const nextPlayTimeRef = useRef<number>(0);

  // Helper to convert Float32 PCM to 16-bit PCM Base64
  const floatTo16BitPCMBase64 = (float32Array: Float32Array): string => {
    const buffer = new ArrayBuffer(float32Array.length * 2);
    const view = new DataView(buffer);
    for (let i = 0; i < float32Array.length; i++) {
      let s = Math.max(-1, Math.min(1, float32Array[i]));
      view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  // Play incoming 24kHz PCM chunk
  const playPCMChunk = (base64Data: string) => {
    try {
      if (!outputAudioCtxRef.current) {
        outputAudioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({
          sampleRate: 24000,
        });
      }
      const ctx = outputAudioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const binary = atob(base64Data);
      const len = binary.length;
      const buffer = new ArrayBuffer(len);
      const view = new DataView(buffer);
      for (let i = 0; i < len; i++) {
        view.setUint8(i, binary.charCodeAt(i));
      }

      const int16Count = Math.floor(len / 2);
      const audioBuffer = ctx.createBuffer(1, int16Count, 24000);
      const channelData = audioBuffer.getChannelData(0);

      for (let i = 0; i < int16Count; i++) {
        channelData[i] = view.getInt16(i * 2, true) / 32768.0;
      }

      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);

      const currentTime = ctx.currentTime;
      const startTime = Math.max(currentTime, nextPlayTimeRef.current);
      source.start(startTime);
      nextPlayTimeRef.current = startTime + audioBuffer.duration;

      audioQueueRef.current.push(source);
      setIsTalking(true);

      source.onended = () => {
        if (ctx.currentTime >= nextPlayTimeRef.current - 0.05) {
          setIsTalking(false);
        }
      };
    } catch (err) {
      console.error('[Live Voice] Error playing PCM chunk:', err);
    }
  };

  const handleStartConversation = async () => {
    try {
      setStatusMessage('Requesting microphone permissions...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/live`;
      setStatusMessage('Connecting to Gemini 3.8 Live session...');

      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        setStatusMessage('Connected · Speak freely with Abhidhab’s Voice Avatar');

        // Setup 16kHz input audio context
        const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
          sampleRate: 16000,
        });
        inputAudioCtxRef.current = inputCtx;

        const source = inputCtx.createMediaStreamSource(stream);
        const processor = inputCtx.createScriptProcessor(4096, 1, 1);
        processorRef.current = processor;

        source.connect(processor);
        processor.connect(inputCtx.destination);

        processor.onaudioprocess = (e) => {
          if (isMuted) return;
          if (ws.readyState === WebSocket.OPEN) {
            const inputData = e.inputBuffer.getChannelData(0);
            const base64PCM = floatTo16BitPCMBase64(inputData);
            ws.send(JSON.stringify({ audio: base64PCM }));
          }
        };
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.audio) {
            playPCMChunk(data.audio);
          }
          if (data.text) {
            setTranscript((prev) => [...prev, { sender: 'agent', text: data.text }]);
          }
          if (data.interrupted) {
            // Cancel current playback on user interruption
            audioQueueRef.current.forEach((src) => {
              try {
                src.stop();
              } catch {}
            });
            audioQueueRef.current = [];
            nextPlayTimeRef.current = 0;
            setIsTalking(false);
          }
          if (data.error) {
            setStatusMessage(`Notice: ${data.error}`);
          }
        } catch (e) {
          console.error('[Live Voice] Error parsing WS message:', e);
        }
      };

      ws.onerror = (err) => {
        console.error('[Live Voice] WebSocket Error:', err);
        setStatusMessage('Connection error with live server.');
      };

      ws.onclose = () => {
        setIsConnected(false);
        setIsTalking(false);
        setStatusMessage('Call ended.');
      };
    } catch (err: any) {
      console.error('[Live Voice] Microphone access error:', err);
      setStatusMessage(`Microphone error: ${err.message || 'Permission denied'}`);
    }
  };

  const handleEndConversation = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (inputAudioCtxRef.current) {
      inputAudioCtxRef.current.close();
      inputAudioCtxRef.current = null;
    }
    if (outputAudioCtxRef.current) {
      outputAudioCtxRef.current.close();
      outputAudioCtxRef.current = null;
    }
    setIsConnected(false);
    setIsTalking(false);
    setStatusMessage('Call ended.');
  };

  useEffect(() => {
    return () => {
      handleEndConversation();
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
    >
      <div className="relative w-full max-w-lg rounded-3xl bg-[#09122B] border border-cyan-400/40 shadow-2xl overflow-hidden flex flex-col p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-cyan-950/50 text-cyan-400 border border-cyan-400/30">
              <Radio className="w-5 h-5 animate-pulse" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-100">
                Gemini 3.8 Live Voice Agent
              </h3>
              <p className="text-xs text-cyan-400 font-mono">
                Real-time Low-Latency Audio Conversation
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              handleEndConversation();
              onClose();
            }}
            aria-label="Close voice agent modal"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Central Visualizer Orb */}
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <div className="relative flex items-center justify-center w-36 h-36">
            {/* Ambient Aura */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-500 blur-xl ${
                isConnected
                  ? isTalking
                    ? 'bg-cyan-400/50 scale-125'
                    : 'bg-blue-500/30 scale-100'
                  : 'bg-slate-700/20 scale-90'
              }`}
            />

            {/* Core Orb */}
            <div
              className={`relative z-10 w-28 h-28 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-2xl ${
                isConnected
                  ? isTalking
                    ? 'bg-gradient-to-tr from-cyan-500 to-sky-300 border-cyan-200 text-slate-950 scale-110 shadow-[0_0_30px_rgba(34,211,238,0.7)]'
                    : 'bg-[#131C38] border-cyan-400/60 text-cyan-400'
                  : 'bg-[#0E162E] border-slate-700 text-slate-500'
              }`}
            >
              {isTalking ? (
                <Volume2 className="w-10 h-10 animate-bounce" />
              ) : (
                <Mic className="w-10 h-10" />
              )}
            </div>
          </div>

          <div className="text-center space-y-1">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
              {isConnected ? (isTalking ? '● Agent Speaking...' : '● Listening for input...') : '○ Offline'}
            </div>
            <p className="text-xs text-slate-400 font-mono max-w-xs mx-auto">
              {statusMessage}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-3 pt-4 border-t border-slate-800">
          {!isConnected ? (
            <button
              type="button"
              onClick={handleStartConversation}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-[0_0_16px_rgba(34,211,238,0.4)] active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Start Voice Session</span>
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                aria-label={isMuted ? 'Unmute microphone' : 'Mute microphone'}
                className={`p-3 rounded-2xl border transition-colors ${
                  isMuted
                    ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                    : 'bg-slate-800 border-slate-700 text-slate-200 hover:text-cyan-300'
                }`}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={handleEndConversation}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm bg-rose-500 hover:bg-rose-600 text-white transition-all shadow-[0_0_16px_rgba(244,63,94,0.4)] active:scale-95"
              >
                <PhoneOff className="w-4 h-4" />
                <span>End Call</span>
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
