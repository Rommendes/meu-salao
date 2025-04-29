
  

  export function formatarTelefone(telefone) {
    if (!telefone) return "";
  
    // Remove tudo que não for número
    const numeros = telefone.replace(/\D/g, "");
  
    // Se tiver menos de 10 dígitos (sem contar o DDI 55), é inválido
    const apenasNumero = numeros.startsWith("55") ? numeros.slice(2) : numeros;
  
    if (apenasNumero.length < 10 || apenasNumero.length > 11) {
      console.warn(`Número de telefone incompleto ou incorreto: ${telefone}`);
      return "";
    }
  
    // Garante que tenha o código do país (55)
    const telefoneFormatado = numeros.startsWith("55") ? numeros : `55${numeros}`;
  
    return telefoneFormatado;
  }
  