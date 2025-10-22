import { fetchRestaurants, createRestaurant, getRestaurantByOwner,
    updateRestaurant,fetchMenuItemsByRestaurant, createProduct,} from '../repositorios/restaurantRepository';

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

export const getMenuItems = async (restaurant_id) => {
  try {
    const items = await fetchMenuItemsByRestaurant(restaurant_id);
    return items;
  } catch (error) {
    console.error('Error al obtener productos:', error.message);
    throw error;
  }
};

/**
 * Crea un producto nuevo (solo para dueños).
 */
export const addProduct = async (restaurant_id, name, description, price, category) => {
  try {
    const newProduct = await createProduct(restaurant_id, name, description, price, category);
    return newProduct;
  } catch (error) {
    console.error('Error al crear producto:', error.message);
    throw error;
  }
};