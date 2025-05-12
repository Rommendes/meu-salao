
const enviarCobrança = async (nome, telefone, valor) => {
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
  const response = await fetch(`${API_URL}/api/enviar-cobrancas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nome, telefone, valor }),
  });

  const result = await response.json();
  console.log(result);
};
