export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(500).json({ erro: 'Chave não encontrada' });

  // Lê o body corretamente
  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ erro: 'Body inválido' });
  }

  // Força o modelo correto
  body.model = 'claude-haiku-4-5-20251001';

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  res.status(response.status).json(data);
}ersion': '2023-06-01',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
