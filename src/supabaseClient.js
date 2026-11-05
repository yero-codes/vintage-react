import { createClient } from '@supabase/supabase-js';

// Вставьте сюда ваш Project URL из Supabase
const supabaseUrl = 'https://mpggpmdgsfmzxwfjoqjz.supabase.co';

// Вставьте сюда ваш anon public ключ
const supabaseKey = 'sb_publishable_cLrQKl9XTt5i0jDDlEJrpg__lHfJ22j';

export const supabase = createClient(supabaseUrl, supabaseKey);