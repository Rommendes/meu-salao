export function formatarValor(valor) {
    if (valor == null || valor === "" || isNaN(Number(valor))) {
      console.warn(`Valor inválido fornecido: ${valor}`);
      return "R$ 0,00";
    }
  
    let numero = typeof valor === "string" ? parseFloat(valor) : valor;
  
    // Corrigir possíveis imprecisões de ponto flutuante
    numero = Math.round((numero + Number.EPSILON) * 100) / 100;
  
    return numero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  

// Exemplo de uso:
// const valor = 1234.56;
// const valorFormatado = formatarValor(valor);
// console.log(valorFormatado); // "R$ 1.234,56"


{/**import { formatarValor } from "../utils/formatarValor";

// Dentro da sua mensagem:
const valorFormatado = formatarValor(valor);

const mensagem = `Olá ${clientes.nome}, lembramos que o pagamento do serviço "${servico}" realizado no dia ${dataAgendamento} está pendente no valor de ${valorFormatado}. Por favor, entre em contato para regularizar. Obrigado!`;
 */}