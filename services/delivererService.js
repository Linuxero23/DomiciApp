import { supabase } from '../supabase';

// Obtiene la información del entregador
export async function getDeliverer(userId) {
  const { data, error } = await supabase
    .from('deliverers')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // ignora error de no encontrado
  return data;
}

// Crea un entregador si no existe
export async function createDeliverer(userId) {
  const { error } = await supabase
    .from('deliverers')
    .insert([{ user_id: userId }]);
  if (error) throw error;
}

// Actualiza la disponibilidad
export async function updateAvailability(userId, isAvailable) {
  const { error } = await supabase
    .from('deliverers')
    .update({ is_available: isAvailable })
    .eq('user_id', userId);

  if (error) throw error;
}

// Actualiza la calificación (opcional)
export async function updateRating(userId, rating) {
  const { error } = await supabase
    .from('deliverers')
    .update({ rating })
    .eq('user_id', userId);

  if (error) throw error;
}
