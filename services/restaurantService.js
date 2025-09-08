// restaurantService.js
import { supabase } from '../supabase';

export const addRestaurant = async ({ owner_id, name, description, address }) => {
  const { data, error } = await supabase.from('restaurants').insert([{ owner_id, name, description, address }]).select();
  if (error) throw error;
  return data;
};

export const fetchRestaurantsByOwner = async (owner_id) => {
  const { data, error } = await supabase.from('restaurants').select('*').eq('owner_id', owner_id);
  if (error) throw error;
  return data;
};

export const fetchRestaurants = async () => {
  const { data, error } = await supabase.from('restaurants').select('*');
  if (error) throw error;
  return data;
};
