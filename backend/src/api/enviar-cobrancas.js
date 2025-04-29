// backend/api/enviar-cobrancas.js
import { enviarMensagemCobranca } from "../services/cobrancasServices.js";
import corsMiddleware from "./lib/cors.js"; // Se tiver configurado CORS certinho

export default async function handler(req, res) {
  await corsMiddleware(req, res); // Habilita CORS

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { nome, telefone, valor } = req.body;

  // Verificar campos obrigatórios
  if (!nome || !telefone || !valor) {
    return res.status(400).json({ message: "Nome, telefone e valor são obrigatórios." });
  }

  // Validar formato básico do telefone (apenas números, com 10 ou 11 dígitos)
  const telefoneLimpo = telefone.replace(/\D/g, ""); // remove tudo que não for número
  if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
    return res.status(400).json({ message: "Telefone inválido. Verifique o número." });
  }

  try {
    const resposta = await enviarMensagemCobranca(nome, telefoneLimpo, valor);

    if (resposta.success) {
      return res.status(200).json({ message: "Cobrança enviada com sucesso!" });
    } else {
      return res.status(500).json({ message: "Falha no envio da cobrança." });
    }
  } catch (error) {
    console.error("Erro ao enviar cobrança:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
}
