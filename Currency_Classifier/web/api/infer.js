export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ROBOFLOW_API_KEY;
  const modelId = process.env.ROBOFLOW_MODEL_ID || 'indian-currency-notes-ecttv';
  const version = process.env.ROBOFLOW_VERSION || '2';

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const base64Image = req.body;
    const roboflowUrl = `https://detect.roboflow.com/${modelId}/${version}?api_key=${apiKey}&confidence=20`;

    const response = await fetch(roboflowUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: base64Image
    });

    if (!response.ok) {
      throw new Error(`Roboflow API error: ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Inference error:', error);
    return res.status(500).json({ error: 'Inference failed' });
  }
}