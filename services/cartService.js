import {
  addToCart,
  getCartItems,
  removeCartItem,
} from '../repositorios/cartRepository';

export const addProductToCart = async (user_id, product_id, quantity = 1) => {
  return await addToCart(user_id, product_id, quantity);
};

export const fetchCartItems = async (user_id) => {
  return await getCartItems(user_id);
};

export const deleteCartItem = async (cart_id) => {
  return await removeCartItem(cart_id);
};
