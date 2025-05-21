// backend > src > controllers > cobrancaController.js
import { enviarMensagemWhatsApp } from '../services/enviarMensagemWhatsApp.js';  // Importando a função de envio de mensagem WhatsApp

// Função para enviar cobrança
const enviarCobrancas = async (req, res) => {
  const { nome, telefone, valor } = req.body;

  if (!nome || !telefone || !valor) {
    return res.status(400).json({ message: "Nome, telefone e valor são obrigatórios." });
  }

  // Lógica de envio de cobrança via WhatsApp ou outro serviço
  try {
    
    const resultado = await enviarMensagemWhatsApp(nome, telefone, valor);  // Chamada para a função de envio de mensagem WhatsApp 

    if (resultado.messages) {
      return res.status(200).json({ message: "Cobrança enviada com sucesso!" });
    } else {
      return res.status(500).json({ message: "Falha no envio da cobrança." });
    }
  } catch (error) {
    console.error("Erro ao enviar cobrança:", error);
    return res.status(500).json({ message: "Erro interno ao enviar cobrança." });
  }
};

// Exportando a função `enviarCobrancas`
export { enviarCobrancas };

