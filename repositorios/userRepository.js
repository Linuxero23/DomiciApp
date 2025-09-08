import { supabase } from '../supabase';

export const getUserByEmail = async (email) => {
  const { data, error } = await supabase.from('users').select('*').eq('email', email).single();
  if (error) throw error;
  return data;
};

export const updateUserRole = async (id, role) => {
  const { data, error } = await supabase.from('users').update({ role }).eq('id', id);
  if (error) throw error;
  return data;
};
