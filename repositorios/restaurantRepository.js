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


/**
 * Obtiene todos los productos de un restaurante específico.
 */
export const fetchMenuItemsByRestaurant = async (restaurant_id) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('restaurant_id', restaurant_id)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
};

/**
 * Crea un nuevo producto (usado por los dueños).
 */
export const createProduct = async (restaurant_id, name, description, price, category) => {
  const { data, error } = await supabase
    .from('products')
    .insert([{ restaurant_id, name, description, price, category }])
    .select()
    .single();

  if (error) throw error;
  return data;
};
