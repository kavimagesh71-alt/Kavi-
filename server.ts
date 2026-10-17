import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '20mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString()
  });
});

// AI Music Generation Endpoint with Lyria
app.post('/api/generate-music', async (req, res) => {
  try {
    const {
      prompt,
      model = 'lyria-3-clip-preview', // 'lyria-3-clip-preview' (up to 30s) or 'lyria-3-pro-preview' (full track)
      personName,
      stylePreset,
    } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(400).json({
        error: 'Missing GEMINI_API_KEY. Please configure your API key in the AI Studio environment.'
      });
    }

    // Build rich musical prompt if not already detailed
    let fullPrompt = prompt;
    if (!fullPrompt || fullPrompt.trim().length === 0) {
      fullPrompt = `A celebratory, heartwarming acoustic birthday song for ${personName || 'a special person'}, with gentle acoustic guitar, music box bells, uplifting warm melody, and birthday cheer.`;
    }

    if (stylePreset) {
      fullPrompt = `${fullPrompt}. Style: ${stylePreset}.`;
    }

    // Target model: either lyria-3-clip-preview or lyria-3-pro-preview
    const selectedModel = model === 'lyria-3-pro-preview' ? 'lyria-3-pro-preview' : 'lyria-3-clip-preview';

    const ai = new GoogleGenAI({ apiKey });

    // Stream generation with Lyria
    const responseStream = await ai.models.generateContentStream({
      model: selectedModel,
      contents: fullPrompt,
    });

    let audioBase64 = '';
    let lyrics = '';
    let mimeType = 'audio/wav';

    for await (const chunk of responseStream) {
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
      return res.status(500).json({
        error: 'Music generation model did not return audio data. Please try another prompt.',
      });
    }

    return res.json({
      success: true,
      model: selectedModel,
      mimeType,
      audioData: audioBase64,
      lyrics: lyrics || null,
      prompt: fullPrompt,
    });
  } catch (err: unknown) {
    console.error('Error generating music:', err);
    const message = err instanceof Error ? err.message : 'Failed to generate music';
    return res.status(500).json({
      error: message,
      details: String(err),
    });
  }
});

// Helper endpoint to suggest creative music prompt ideas using gemini-3.8-flash
app.post('/api/music-suggestions', async (req, res) => {
  try {
    const { personName, relationship, theme } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.json({
        suggestions: [
          `Sweet music box lullaby and acoustic fingerpicking celebrating ${personName || 'my favorite person'}'s birthday.`,
          `Joyful festive indie-pop anthem with clapping, bells, and upbeat acoustic guitar.`,
          `Gentle piano and cello melody with warm cinematic swells for a memorable birthday.`,
          `Sparkling lo-fi chillhop beat with music-box melody and relaxing birthday warmth.`,
        ]
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Provide 4 short, distinct music prompts (each 1-2 sentences) suitable for an AI music model (Lyria) to generate a birthday soundtrack for ${personName || 'a loved one'}. The relationship is "${relationship || 'Friend'}" and theme is "${theme || 'romantic'}". Focus on instruments, mood, tempo, and atmosphere. Return each prompt on a new line starting with "- ". No other text.`,
    });

    const text = response.text || '';
    const suggestions = text
      .split('\n')
      .map(s => s.replace(/^-\s*/, '').trim())
      .filter(s => s.length > 10);

    return res.json({ suggestions: suggestions.length > 0 ? suggestions : [
      `Acoustic guitar and music box melody celebrating ${personName}'s special day with warmth and smile.`,
      `Upbeat celebratory pop track with bright horns, playful piano chords, and joy.`,
      `Romantic candlelight piano waltz with gentle strings.`,
      `Uplifting cinematic celebration soundtrack with orchestral chimes.`
    ]});
  } catch {
    return res.json({
      suggestions: [
        'Acoustic guitar and music box melody with gentle warmth and celebratory bells.',
        'Upbeat festive pop celebration with playful piano and rhythmic handclaps.',
        'Cozy lo-fi birthday beat with sparkling chimes and relaxing chords.',
        'Grand cinematic piano and strings celebration for an unforgettable birthday.'
      ]
    });
  }
});

// Mount Vite or static server
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Birthday Surprise Journey server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
