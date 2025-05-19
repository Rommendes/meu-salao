// backend > src > controllers > cobrancaController.js
const supabase = require('../lib/supabase');

const getClientes = async (req, res) => {
  const { data, error } = await supabase
    .from('clientes')
    .select('*');  // Exemplo de operação: selecionar todos os clientes

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data);
};

module.exports = { getClientes };
