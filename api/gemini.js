export default async function handler(req, res) {
  // Hanya izinkan metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, did } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt wajib diisi' });
  }

  // Ambil API Key dari Environment Variable Vercel (BUKAN dari kode!)
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API Key belum diset di server Vercel' });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const ownerDid = did || 'did:key:z6MkmZAR1ePxsJgaES7HtyvKtamQyTybu9GBzuqFK6GwVyZi';

  const payload = {
    contents: [{
      parts: [{
        text: `Translate and structure this idea into a high-quality, professional English community contribution post for a web3 project. Make it organic and unique to avoid anti-spam filters. Idea: "${prompt}". Near the bottom, append this ownership marker line exactly: "[Cryptographic Owner Node DID: ${ownerDid}]"`
      }]
    }]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || 'Gemini API Error'
      });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!text) {
      return res.status(500).json({ error: 'Gemini tidak mengembalikan respons' });
    }

    return res.status(200).json({ text });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
