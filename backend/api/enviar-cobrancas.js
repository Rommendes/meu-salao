import { processarCobrancas } from "../services/cobrancasServices";
import cors from "../lib/cors";

export default async function handler(req, res) {
  await cors(req, res); // Ativa o CORS se for necessário

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  try {
    const sucesso = await processarCobrancas();

    if (sucesso) {
      return res.status(200).json({ message: "Cobranças enviadas com sucesso!" });
    } else {
      return res.status(500).json({ message: "Erro ao enviar algumas cobranças." });
    }
  } catch (error) {
    console.error("Erro no envio de cobranças:", error);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
}
