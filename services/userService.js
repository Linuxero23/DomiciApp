// services/userService.js
import { supabase } from '../supabase';

export async function getUserByEmail(email) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  if (error) throw error;
  return data;
}

export async function createUser(user) {
  const { data, error } = await supabase
    .from('users')
    .insert([user]);
  if (error) throw error;
  return data;
}
