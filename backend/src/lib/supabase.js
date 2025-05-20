// backend > src > lib > supabase.js
import { createClient } from '@supabase/supabase-js';

// Carregar as variáveis de ambiente
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;  // Ou a chave de serviço, dependendo do seu caso

console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY);
// Verifica se as variáveis de ambiente estão definidas

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL e SUPABASE_ANON_KEY são necessários!');
}

// Cria a instância do Supabase
const supabase = createClient(supabaseUrl, supabaseKey);



export default supabase;

