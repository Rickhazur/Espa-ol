const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = "https://wapnlkyyamwtleerpwxj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_274gdLcayOJVo4hV3ZiJHQ_6QbRoh5p";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const users = [
  { email: 'karin@estudiante.com', password: '2026', options: { data: { nombre: 'Karin' } } },
  { email: 'eli@estudiante.com', password: '2026', options: { data: { nombre: 'Eli' } } },
  { email: 'teacher@bogota.co', password: '2026', options: { data: { nombre: 'Profesor' } } }
];

async function createUsers() {
  for (const u of users) {
    console.log(`Intentando registrar a ${u.email}...`);
    const { data, error } = await supabase.auth.signUp({
      email: u.email,
      password: u.password,
      options: u.options
    });
    if (error) {
      console.error(`Error registrando a ${u.email}:`, error.message);
    } else {
      console.log(`Registro exitoso para ${u.email}. User ID:`, data.user?.id);
    }
  }
}

createUsers();
