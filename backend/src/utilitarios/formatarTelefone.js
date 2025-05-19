
// backend > src > utilitarios > formatarTelefone.js

const formatarTelefone = (telefone) => {
  // Lógica para formatar o telefone
  return telefone.replace(/\D/g, '');  // Remove todos os caracteres não numéricos
};

// Remova o console.log da declaração da função
console.log("Função formatarTelefone está definida corretamente.");  // Coloque o console.log aqui, após a função ser definida

module.exports = formatarTelefone;
