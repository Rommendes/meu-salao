
export default async function handler(req, res) {
  // Liberar o CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Responde rápido para requisição de preflight
     res.status(200).end();
     return
  }

  if (req.method === 'POST') {
    try {
      const { numeroTelefone, mensagem } = req.body;

      const url = `https://api.callmebot.com/whatsapp.php?phone=${numeroTelefone}&text=${encodeURIComponent(mensagem)}&apikey=SUA_API_KEY_AQUI`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem pelo CallMeBot');
      }

      return res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      return res.status(500).json({ error: 'Erro ao enviar mensagem' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  if (req.method === 'POST') {
    // Aqui o envio da cobrança
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
