import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ugriecunjidwkscuxkfl.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVncmllY3Vuamlkd2tzY3V4a2ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0MjA0NTAsImV4cCI6MjA1Nzk5NjQ1MH0.Bdh2migrnSqCUluiIxWqHvuXjcy1IzW9Yy_I1geHfAk"


export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// frontend/src/api/supabaseCliente.js

import { supabase } from "./supabaseClient";

// Função para buscar os agendamentos com pagamento pendente
export async function getAgendamentosPendentes() {
  const { data, error } = await supabase
    .from("agendamentos")
    .select("*")
    .eq("pagamento", false); // ou ajuste conforme o nome real da coluna

  if (error) throw new Error(error.message);

  return data;
}
