export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ROBOFLOW_API_KEY;
  const modelId = process.env.ROBOFLOW_MODEL_ID || 'indian-currency-notes-ecttv';
  const version = process.env.ROBOFLOW_VERSION || '2';
  const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  if (allowedOrigins.length > 0) {
    const requestOrigin = req.headers.origin;
    if (!requestOrigin || !allowedOrigins.includes(requestOrigin)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
  }

  try {
    const base64Image =
      typeof req.body === 'string'
        ? req.body
        : (req.body && req.body.image) || '';

    if (!base64Image) {
      return res.status(400).json({ error: 'Missing image payload' });
    }

    if (base64Image.length > 8 * 1024 * 1024) {
      return res.status(413).json({ error: 'Image payload too large' });
    }

    if (!/^[A-Za-z0-9+/=]+$/.test(base64Image)) {
      return res.status(400).json({ error: 'Invalid image payload' });
    }

    const roboflowUrl = `https://detect.roboflow.com/${modelId}/${version}?api_key=${apiKey}&confidence=20`;

    const response = await fetch(roboflowUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: base64Image
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Roboflow API error:', response.status, errText);
      return res.status(response.status).json({
        error: 'Inference failed'
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Inference error:', error);
    return res.status(500).json({ error: 'Inference failed' });
  }
}