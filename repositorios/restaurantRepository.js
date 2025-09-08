import { supabase } from '../supabase';

export const fetchRestaurants = async () => {
  const { data, error } = await supabase.from('restaurants').select('*');
  if (error) throw error;
  return data;
};

export const createRestaurant = async (owner_id, name, description, address, category) => {
  const { data, error } = await supabase
    .from('restaurants')
    .insert([{ owner_id, name, description, address, category }]);
  if (error) throw error;
  return data;
};

export const getRestaurantByOwner = async (owner_id) => {
  const { data, error } = await supabase.from('restaurants').select('*').eq('owner_id', owner_id).single();
  if (error) throw error;
  return data;
};
