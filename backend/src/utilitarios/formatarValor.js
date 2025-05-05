export default function formatarValor(valor) {
  return Number(valor).toFixed(2).replace('.', ',');
}
