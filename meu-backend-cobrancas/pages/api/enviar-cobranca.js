import { enviarMensagemCobranca } from "@/src/services/cobrancaService";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  const { nome, telefone, valor } = req.body;

  try {
    await enviarMensagemCobranca({ nome, telefone, valor });
    return res.status(200).json({ sucesso: true });
  } catch (error) {
    return res.status(500).json({ sucesso: false, erro: error.message });
  }
}
