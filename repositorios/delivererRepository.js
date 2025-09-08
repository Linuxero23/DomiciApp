import { supabase } from '../supabase';

export const getDeliverer = async (user_id) => {
  const { data, error } = await supabase.from('deliverers').select('*').eq('user_id', user_id).single();
  if (error) throw error;
  return data;
};

export const updateDelivererAvailability = async (user_id, is_available) => {
  const { data, error } = await supabase.from('deliverers').update({ is_available }).eq('user_id', user_id);
  if (error) throw error;
  return data;
};
