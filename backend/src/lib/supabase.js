{/*}
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config'; // Carrega as variáveis do .env automaticamente

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
}*/}

// backend > src > lib > supabase.js
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Criar o cliente Supabase com a Service Role Key
const supabase = createClient(
  process.env.SUPABASE_URL,  // URL do Supabase
  process.env.SUPABASE_SERVICE_ROLE_KEY  // A Service Role Key
);

module.exports = supabase;
