import { fetchRestaurants, createRestaurant, getRestaurantByOwner } from '../repositorios/restaurantRepository';

export const getAllRestaurants = async () => {
  return await fetchRestaurants();
};

export const addRestaurant = async (owner_id, name, description, address, category) => {
  const existing = await getRestaurantByOwner(owner_id);
  if (existing) throw new Error('Ya existe un restaurante para este usuario');
  return await createRestaurant(owner_id, name, description, address, category);
};

export const getOwnerRestaurant = async (owner_id) => {
  return await getRestaurantByOwner(owner_id);
};
