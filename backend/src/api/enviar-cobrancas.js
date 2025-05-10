import express from 'express';
import { enviarMensagemWhatsApp } from '../services/enviarMensagemWhatsApp.js';
import formatarTelefone from '../utilitarios/formatarTelefone.js';
import formatarValor from '../utilitarios/formatarValor.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { nome, telefone, valor } = req.body;

  if (!nome || !telefone || !valor) {
    return res.status(400).json({ message: "Nome, telefone e valor são obrigatórios." });
  }

  const telefoneFormatado = formatarTelefone(telefone);
  const valorFormatado = formatarValor(valor);

  try {
    const resultado = await enviarMensagemWhatsApp(nome, telefoneFormatado, valorFormatado);
    console.log("📤 Resultado:", resultado);

    if (resultado.messages) {
      return res.status(200).json({ message: "Cobrança enviada com sucesso!" });
    } else {
      return res.status(500).json({ message: "Falha no envio pelo WhatsApp.", detalhe: resultado });
    }
  } catch (error) {
    console.error("❌ Erro no envio:", error);
    return res.status(500).json({ message: "Erro interno ao enviar cobrança." });
  }
});

export default router;


