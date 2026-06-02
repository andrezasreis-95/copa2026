export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const key = process.env.ANTHROPIC_API_KEY;

  // Diagnóstico: mostra se a chave existe e como começa
  if (!key) {
    return res.status(500).json({ erro: 'Chave não encontrada no servidor' });
  }

  if (!key.startsWith('sk-ant-')) {
    return res.status(500).json({ erro: 'Chave com formato inválido', inicio: key.slice(0, 8) });
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(req.body),
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
