const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export async function enviarCobranca({ nome, telefone, valor }) {
  try {
    const resposta = await fetch(`${API_URL}/api/enviar-cobrancas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, telefone, valor }),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(dados.message || "Erro ao enviar cobrança");
    }

    return dados;
  } catch (error) {
    console.error("Erro no envio de cobrança:", error);
    throw error;
  }
}
