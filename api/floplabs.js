export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { room, did, sig, message, nonce } = req.body;

  if (!room || !did || !sig || !message) {
    return res.status(400).json({ error: 'Data tidak lengkap' });
  }

  const encodedText = encodeURIComponent(message);
  const targetUrl = `https://technocore.chat/${room}/say-signed/${did}/${sig}/${nonce}/${encodedText}`;

  try {
    const response = await fetch(targetUrl, { method: 'GET' });
    const text = await response.text();

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Server Flop Labs menolak permintaan',
        detail: text
      });
    }

    return res.status(200).json({ success: true, response: text });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
