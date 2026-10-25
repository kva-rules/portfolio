import { useState, useRef } from 'react';
import { Music, Play, Pause, Download, Sparkles, X, Volume2, RefreshCw, AlertCircle } from 'lucide-react';

interface MusicStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MusicStudioModal({ isOpen, onClose }: MusicStudioModalProps) {
  const [prompt, setPrompt] = useState('Lo-Fi Deep Focus Coding Beat with mellow Rhodes piano, soft vinyl crackle, and steady sub-bass (85 BPM)');
  const [model, setModel] = useState<'lyria-3-clip-preview' | 'lyria-3-pro-preview'>('lyria-3-clip-preview');
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [lyrics, setLyrics] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isProceduralPlaying, setIsProceduralPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const proceduralCtxRef = useRef<AudioContext | null>(null);

  const presets = [
    {
      label: 'Lo-Fi Coding Beat',
      text: 'Lo-Fi Deep Focus Coding Beat with mellow Rhodes piano, soft vinyl crackle, and steady sub-bass (85 BPM)',
    },
    {
      label: 'Cyberpunk Microservices',
      text: 'Cinematic Cyberpunk Synthwave track with driving 16th-note analog arpeggiator, punchy synth drums, and dystopian neon atmosphere (124 BPM)',
    },
    {
      label: 'Ambient Architecture',
      text: 'Ethereal ambient soundscape with drifting granular pads, soft acoustic piano chords, and spatial delay echoes',
    },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setStatusMessage(`Requesting music stream from ${model}...`);

    try {
      const response = await fetch('/api/music/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Generation failed');
      }

      // Decode base64 audio
      const binary = atob(data.audioBase64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: data.mimeType || 'audio/wav' });
      const url = URL.createObjectURL(blob);

      setAudioUrl(url);
      setLyrics(data.lyrics || null);
      setStatusMessage('Track successfully generated and ready to play!');
    } catch (err: any) {
      console.warn('[Music Studio] Lyria error:', err.message);
      setStatusMessage(
        err.message?.includes('paid') || err.message?.includes('quota')
          ? 'Note: Lyria models require a paid API key. You can also preview the procedural Web Audio synthesizer below!'
          : `Notice: ${err.message}`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Fallback: Procedural Web Audio Synth for instant preview
  const toggleProceduralSynth = () => {
    if (isProceduralPlaying) {
      if (proceduralCtxRef.current) {
        proceduralCtxRef.current.close();
        proceduralCtxRef.current = null;
      }
      setIsProceduralPlaying(false);
      return;
    }

    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      proceduralCtxRef.current = ctx;

      // Pentatonic Arpeggio notes (C minor pentatonic: C, Eb, F, G, Bb)
      const freqs = [130.81, 155.56, 174.61, 196.0, 233.08, 261.63, 311.13, 392.0];
      let step = 0;

      const scheduleNote = () => {
        if (!proceduralCtxRef.current) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = step % 4 === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freqs[step % freqs.length], now);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.6);

        step++;
      };

      const intervalId = window.setInterval(scheduleNote, 220);

      // Save interval cleanup
      const originalClose = ctx.close.bind(ctx);
      ctx.close = async () => {
        clearInterval(intervalId);
        return originalClose();
      };

      setIsProceduralPlaying(true);
      setStatusMessage('Playing procedural ambient synthesizer...');
    } catch (e) {
      console.error(e);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
    >
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#09122B] border border-cyan-400/40 shadow-2xl overflow-hidden flex flex-col p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-cyan-950/50 text-cyan-400 border border-cyan-400/30">
              <Music className="w-5 h-5 text-cyan-400" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-100">
                AI Music Generation Studio
              </h3>
              <p className="text-xs text-cyan-400 font-mono">
                Powered by Google Lyria 3 Models
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (proceduralCtxRef.current) {
                proceduralCtxRef.current.close();
                proceduralCtxRef.current = null;
              }
              setIsProceduralPlaying(false);
              onClose();
            }}
            aria-label="Close music generator modal"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Model Selection */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
              Select Lyria Model:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setModel('lyria-3-clip-preview')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  model === 'lyria-3-clip-preview'
                    ? 'bg-[#1A2447] border-cyan-400 text-cyan-300 shadow-md'
                    : 'bg-[#0E162E] border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold font-mono">lyria-3-clip-preview</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Short clips up to 30s</div>
              </button>

              <button
                type="button"
                onClick={() => setModel('lyria-3-pro-preview')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  model === 'lyria-3-pro-preview'
                    ? 'bg-[#1A2447] border-cyan-400 text-cyan-300 shadow-md'
                    : 'bg-[#0E162E] border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold font-mono">lyria-3-pro-preview</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Full-length tracks</div>
              </button>
            </div>
          </div>

          {/* Prompt Presets */}
          <div>
            <div className="text-xs font-mono uppercase text-slate-400 mb-2">
              Quick Prompt Presets:
            </div>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setPrompt(preset.text)}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-[#131C38] border border-slate-700/60 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Textarea */}
          <div>
            <label htmlFor="music-prompt" className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
              Music Description / Prompt:
            </label>
            <textarea
              id="music-prompt"
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#0B1020] border border-slate-800 text-slate-200 text-xs font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
            />
          </div>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div className="p-3 rounded-xl bg-[#0E162E] border border-slate-800 text-xs font-mono text-cyan-300 mb-6 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Audio Player if generated */}
        {audioUrl && (
          <div className="p-4 rounded-2xl bg-[#0B1020] border border-slate-800 mb-6 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300">
              <span className="font-bold flex items-center gap-1.5 text-cyan-400">
                <Volume2 className="w-4 h-4" />
                <span>Generated Audio Track</span>
              </span>
              <a
                href={audioUrl}
                download="ai-generated-track.wav"
                className="inline-flex items-center gap-1 text-cyan-400 hover:underline"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download WAV</span>
              </a>
            </div>

            <audio ref={audioRef} controls src={audioUrl} className="w-full" autoPlay />

            {lyrics && (
              <div className="p-3 rounded-lg bg-[#0E162E] text-xs font-mono text-slate-400">
                <span className="text-slate-200 font-bold">Lyrics: </span>
                {lyrics}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={toggleProceduralSynth}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold border transition-all ${
              isProceduralPlaying
                ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                : 'bg-[#131C38] border-slate-700 text-slate-300 hover:text-cyan-300'
            }`}
          >
            {isProceduralPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isProceduralPlaying ? 'Stop Web Audio Synth' : 'Preview Web Audio Synth'}</span>
          </button>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-[0_0_16px_rgba(34,211,238,0.35)] disabled:opacity-50 active:scale-95"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating Track...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate with {model === 'lyria-3-clip-preview' ? 'Lyria Clip' : 'Lyria Pro'}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
