export default async function buscarCobrancasPendentes() {
    const resposta = await fetch("http://localhost:3001/api/cobrancas");
    if (!resposta.ok) throw new Error("Erro ao buscar cobranças pendentes");
    return resposta.json();
  }
  