import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const MAX_PROMPT_CHARS = 500;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body || {};
    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    if (prompt.length > MAX_PROMPT_CHARS) {
      return res.status(400).json({ error: `Prompt must be ${MAX_PROMPT_CHARS} characters or fewer` });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Convert the following into one short English check-in message for the Technocore agent network (one line, under 200 characters). Output only the message, no quotes, no explanation:\n${prompt.trim()}`,
    });

    const message = (response.text || '').replace(/\s+/g, ' ').trim();
    if (!message) {
      return res.status(500).json({ error: 'Empty response from server' });
    }

    return res.status(200).json({ message });
  } catch (error) {
    console.error('Gemini API error:', error);
    return res.status(500).json({ error: 'Failed to generate content' });
  }
}
