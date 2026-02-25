import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";
// 👇 הדבק כאן את כתובת ה-URL של פרויקט ה-Supabase שלך
const SUPABASE_URL = "https://iwfzkyklzkxscqlcvmxu.supabase.co";

// 👇 הדבק כאן את המפתח הציבורי (Publishable / Anon) של Supabase
const SUPABASE_PUBLIC_KEY = "sb_publishable_roA420kjqxP0vZDnO20aog_ozzzn07O";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLIC_KEY,
);
