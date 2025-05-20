// backend > src > api > enviarCobrancas.js
import express from 'express';
import { enviarMensagemWhatsApp } from '../services/enviarMensagemWhatsapp.js';  // Importação correta
import formatarTelefone from '../utilitarios/formatarTelefone.js';  // Função para formatar telefone
import formatarValor from '../utilitarios/formatarValor.js';  


const router = express.Router();

// Registra a rota POST para /api/cobrancas
router.post('/', async (req, res) => {
  const { nome, telefone, valor } = req.body;

  if (!nome || !telefone || !valor) {
    return res.status(400).json({ message: "Nome, telefone e valor são obrigatórios." });
  }

  const telefoneFormatado = formatarTelefone(telefone);
  const valorFormatado = formatarValor(valor);

  try {
    const resultado = await enviarMensagemWhatsApp(nome, telefoneFormatado, valorFormatado);
    if (resultado.messages) {
      return res.status(200).json({ message: "Cobrança enviada com sucesso!" });
    } else {
      return res.status(500).json({ message: "Falha no envio pelo WhatsApp." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Erro interno ao enviar cobrança." });
  }
});

export default router;


