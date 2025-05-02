export const enviarCobranca = async (req, res) => {
    try {
      const { nome, telefone, valor } = req.body;
  
      // Aqui você colocaria a chamada para o CallMeBot ou outro serviço de cobrança.
      console.log(`Enviando cobrança para ${nome} (${telefone}) no valor de R$${valor}`);
  
      res.status(200).json({ mensagem: "Cobrança enviada com sucesso!" });
    } catch (error) {
      console.error("Erro ao enviar cobrança:", error);
      res.status(500).json({ erro: "Erro ao enviar cobrança." });
    }
  };
  