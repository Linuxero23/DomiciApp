import { supabase } from '../supabase';

// Agrega o actualiza producto en el carrito
export const addToCart = async (user_id, product_id, quantity = 1) => {
  // Verifica si el producto ya está en el carrito
  const { data: existing } = await supabase
    .from('cart')
    .select('*')
    .eq('user_id', user_id)
    .eq('product_id', product_id)
    .single();

  if (existing) {
    // Si existe, actualiza cantidad
    const { data, error } = await supabase
      .from('cart')
      .update({ quantity: existing.quantity + quantity })
      .eq('id', existing.id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } else {
    // Si no existe, lo inserta
    const { data, error } = await supabase
      .from('cart')
      .insert([{ user_id, product_id, quantity }])
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};

// Obtiene todos los productos del carrito del usuario
export const getCartItems = async (user_id) => {
  const { data, error } = await supabase
    .from('cart')
    .select(`
      id,
      quantity,
      products (id, name, description, price)
    `)
    .eq('user_id', user_id);
  if (error) throw error;
  return data;
};

// Elimina un producto del carrito
export const removeCartItem = async (cart_id) => {
  const { error } = await supabase.from('cart').delete().eq('id', cart_id);
  if (error) throw error;
};
