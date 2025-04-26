import axios from "axios";

export async function enviarCobranca({ nome, telefone, valor }) {
  try {
    const response = await axios.post('/api/enviar-cobrancas', {
      nome,
      telefone,
      valor
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao enviar cobrança:', error.response?.data || error.message);
    throw error;
  }
}
