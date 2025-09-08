import { getDeliverer, updateDelivererAvailability } from '../repositorios/delivererRepository';

export const toggleAvailability = async (user_id) => {
  const deliverer = await getDeliverer(user_id);
  if (!deliverer) throw new Error('Entregador no encontrado');
  return await updateDelivererAvailability(user_id, !deliverer.is_available);
};
