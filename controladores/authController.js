import { getUserByEmail, updateUserRole } from '../repositorios/userRepository';

export const loginUser = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user || user.password !== password) throw new Error('Usuario no encontrado o contraseña incorrecta');
  return user;
};

export const assignRole = async (userId, role) => {
  return await updateUserRole(userId, role);
};
