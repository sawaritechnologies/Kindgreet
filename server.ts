import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini API client lazily / safely
  let genAI: GoogleGenAI | null = null;
  const getAI = () => {
    if (!genAI) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        genAI = new GoogleGenAI({ apiKey });
      }
    }
    return genAI;
  };

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // AI Samaritan Assistant endpoint (Server-side Gemini)
  app.post('/api/ai/help-assistant', async (req, res) => {
    try {
      const { task, prompt, category, urgency, mode } = req.body;
      const ai = getAI();

      if (!ai) {
        // Fallback intelligent responses when key is not provided in env
        if (task === 'draft_request') {
          return res.json({
            title: `URGENT: ${prompt ? prompt.slice(0, 45) : 'Community Assistance Needed'}`,
            description: `We are seeking immediate community assistance for ${prompt || 'this situation'}. Safety and mutual respect are paramount. Please connect via private chat if you can assist!`,
            suggestedCategory: category || 'Emergency & Safety',
            suggestedTags: ['CommunityAid', 'MutualHelp', 'Urgent']
          });
        } else if (task === 'draft_vlog_caption') {
          return res.json({
            caption: `Grateful for the incredible community spirit today! 💕 Helping neighbors with ${prompt || 'mutual aid'} proved once again that kindness is contagious. #KindGrid #AltruismInAction #NeighborhoodHeroes`,
            suggestedTags: ['#KindGrid', '#AltruismInAction', '#MutualAid']
          });
        } else {
          return res.json({
            response: `As your KindGrid AI Assistant, I suggest coordinating via private chat rooms to clarify ${mode || 'volunteer'} arrangements, verify location safety, and leave a genuine Social Rating after fulfillment.`
          });
        }
      }

      let systemInstruction = 'You are the KindGrid AI Altruism & Safety Assistant. Help users format urgent help requests clearly, write inspirational kindness story captions, or give safety advice.';
      let userQuery = '';

      if (task === 'draft_request') {
        userQuery = `Format a clear, respectful, actionable help request based on: "${prompt}". Category: ${category || 'General'}, Urgency: ${urgency || 'URGENT'}, Mode: ${mode || 'VOLUNTEER'}. Provide JSON with keys: title, description, suggestedCategory, suggestedTags (array).`;
      } else if (task === 'draft_vlog_caption') {
        userQuery = `Write an uplifting, engaging social media caption for a kindness vlog/story based on: "${prompt}". Provide JSON with keys: caption, suggestedTags (array).`;
      } else {
        userQuery = `User asks: "${prompt}". Provide a helpful 2-sentence response focused on mutual aid, ethics, or direct support.`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userQuery,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
        }
      });

      const responseText = response.text || '{}';
      try {
        const jsonResult = JSON.parse(responseText);
        return res.json(jsonResult);
      } catch {
        return res.json({ response: responseText });
      }

    } catch (err: any) {
      console.error('Gemini API Error:', err);
      res.status(500).json({
        error: 'Failed to process AI assist request',
        details: err?.message || 'Unknown error'
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`KindGrid Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
