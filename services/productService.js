import { supabase } from '../supabase';

export const fetchProductsByRestaurant = async (restaurantId) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('restaurant_id', restaurantId);

  if (error) throw error;
  return data;
};
