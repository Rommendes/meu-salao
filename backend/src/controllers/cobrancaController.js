// backend > src > controllers > cobrancaController.js
import supabase from '../lib/supabase.js';  // Importando a instância do Supabase

// Função para enviar cobrança
const enviarCobrancas = async (req, res) => {
  const { nome, telefone, valor } = req.body;

  if (!nome || !telefone || !valor) {
    return res.status(400).json({ message: "Nome, telefone e valor são obrigatórios." });
  }

  // Lógica de envio de cobrança via WhatsApp ou outro serviço
  try {
    // Exemplo: Enviar cobrança via WhatsApp (a função enviarMensagemWhatsApp precisa ser implementada)
    const resultado = await enviarMensagemWhatsApp(nome, telefone, valor);  // Supondo que você tenha uma função para enviar mensagens no WhatsApp
    
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

