// controlador/LoginController.js
import { loginUser } from './authController';

export async function handleLogin(email, password, navigation) {
  if (!email || !password) {
    return { alert: { title: 'Error', message: 'Por favor ingresa email y contraseña' } };
  }

  const { data, error } = await loginUser(email, password);

  if (error || !data) {
    return {
      alert: {
        title: 'Usuario no encontrado',
        message: '¿No tienes una cuenta? Regístrate ahora.',
        actions: [
          { text: 'Cancelar' },
          { text: 'Registrarse', navigateTo: 'Register' }
        ]
      }
    };
  }

  // Retornamos la acción según el rol
  let nextScreen = 'ClientHome';
  if (data.role === 'Cliente') nextScreen = 'ClientScreen';
  else if (data.role === 'Restaurante') nextScreen = 'RestaurantScreen';
  else if (data.role === 'Entregador') nextScreen = 'DelivererScreen';

  return { alert: { title: 'Éxito', message: `¡Bienvenido ${data.name}!` }, nextScreen, name: data.name };
}
