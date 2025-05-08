
import axios from "axios";

export async function enviarCobranca({ nome, telefone, valor }) {
  try {
    const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
    console.log("API_URL carregada:", API_URL); // Ajuda no debug

    const response = await axios.post(`${API_URL}/api/cobrancas`, {
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
