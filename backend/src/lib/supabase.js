{/*import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = "https://ugriecunjidwkscuxkfl.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVncmllY3Vuamlkd2tzY3V4a2ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0MjA0NTAsImV4cCI6MjA1Nzk5NjQ1MH0.Bdh2migrnSqCUluiIxWqHvuXjcy1IzW9Yy_I1geHfAk";

export const supabase = createClient(supabaseUrl, supabaseKey);*/}
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default supabase;
