export default function formatarTelefoneExibicao(telefone) {
  if (!telefone) return "";

  const numeros = telefone.replace(/\D/g, "");

  if (numeros.length === 11) {
    // Celular: (11) 91234-5678
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  } else if (numeros.length === 10) {
    // Fixo: (11) 1234-5678
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
  }

  return telefone; // Fallback (não formatado)
}


