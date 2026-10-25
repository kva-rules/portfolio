import express, { Request, Response } from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { WebSocketServer, WebSocket } from 'ws';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini SDK with runtime API key
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// ----------------------------------------------------
// 1. Live API WebSocket Bridge (gemini-3.8-live)
// ----------------------------------------------------
const wss = new WebSocketServer({ server, path: '/live' });

wss.on('connection', async (clientWs: WebSocket) => {
  console.log('[Live API] Client connected to WebSocket');

  if (!apiKey) {
    clientWs.send(
      JSON.stringify({
        error: 'GEMINI_API_KEY is not configured on the server.',
      })
    );
    return;
  }

  let session: any = null;

  try {
    session = await ai.live.connect({
      model: 'gemini-3.8-live',
      callbacks: {
        onmessage: (message: LiveServerMessage) => {
          // Model audio chunk
          const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          const text = message.serverContent?.modelTurn?.parts?.[0]?.text;
          if (audio) {
            clientWs.send(JSON.stringify({ audio, text }));
          }
          if (message.serverContent?.interrupted) {
            clientWs.send(JSON.stringify({ interrupted: true }));
          }
        },
      },
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
        },
        systemInstruction:
          "You are the voice avatar representing Abhidhab Mellwyn, a Full Stack Engineer and AI Agents Specialist with 4+ years at Cognizant and an M.Tech from BITS Pilani. Answer questions conversationally, concisely, and professionally about Abhidhab's experience in React, Java, Spring Boot microservices, Kafka, and autonomous AI agents.",
      },
    });

    console.log('[Live API] Connected to Gemini 3.8 Live session');

    clientWs.on('message', (data: any) => {
      try {
        const parsed = JSON.parse(data.toString());
        if (parsed.audio && session) {
          session.sendRealtimeInput({
            audio: { data: parsed.audio, mimeType: 'audio/pcm;rate=16000' },
          });
        }
      } catch (err) {
        console.error('[Live API] Error forwarding client audio:', err);
      }
    });

    clientWs.on('close', () => {
      console.log('[Live API] Client disconnected');
      try {
        if (session && typeof session.close === 'function') {
          session.close();
        }
      } catch {
        // Ignore close error
      }
    });
  } catch (error: any) {
    console.error('[Live API] Failed to connect to Gemini Live session:', error?.message || error);
    clientWs.send(
      JSON.stringify({
        error: error?.message || 'Failed to initialize Gemini 3.8 Live session',
      })
    );
  }
});

// ----------------------------------------------------
// 2. Music Generation (Lyria Models)
// ----------------------------------------------------
app.post('/api/music/generate', async (req: Request, res: Response): Promise<void> => {
  const { prompt, model = 'lyria-3-clip-preview' } = req.body;

  if (!prompt) {
    res.status(400).json({ error: 'Prompt is required' });
    return;
  }

  if (!apiKey) {
    res.status(500).json({ error: 'GEMINI_API_KEY is not configured.' });
    return;
  }

  try {
    const selectedModel =
      model === 'lyria-3-pro-preview' ? 'lyria-3-pro-preview' : 'lyria-3-clip-preview';

    console.log(`[Music] Generating music with ${selectedModel} for: "${prompt}"`);

    const response = await ai.models.generateContentStream({
      model: selectedModel,
      contents: prompt,
    });

    let audioBase64 = '';
    let lyrics = '';
    let mimeType = 'audio/wav';

    for await (const chunk of response) {
      const parts = chunk.candidates?.[0]?.content?.parts;
      if (!parts) continue;

      for (const part of parts) {
        if (part.inlineData?.data) {
          if (!audioBase64 && part.inlineData.mimeType) {
            mimeType = part.inlineData.mimeType;
          }
          audioBase64 += part.inlineData.data;
        }
        if (part.text && !lyrics) {
          lyrics = part.text;
        }
      }
    }

    if (!audioBase64) {
      throw new Error('No audio data returned by Lyria model.');
    }

    res.json({
      success: true,
      audioBase64,
      mimeType,
      lyrics,
      model: selectedModel,
    });
  } catch (error: any) {
    console.error('[Music] Lyria Generation Error:', error?.message || error);
    res.status(502).json({
      success: false,
      error: error?.message || 'Music generation failed. Lyria models require a paid API key.',
      isQuotaOrBilling: error?.message?.includes('quota') || error?.message?.includes('billing') || error?.message?.includes('not found') || error?.message?.includes('PERMISSION_DENIED'),
    });
  }
});

// ----------------------------------------------------
// 3. Vite Middleware (Dev) vs Static Files (Prod)
// ----------------------------------------------------
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
