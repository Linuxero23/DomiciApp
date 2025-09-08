import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform 
} from 'react-native';
import { supabase } from '../supabase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa email y contraseña');
      return;
    }
 
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (error || !data) {
      Alert.alert(
        'Usuario no encontrado',
        '¿No tienes una cuenta? Regístrate ahora.',
        [
          { text: 'Cancelar' },
          { text: 'Registrarse', onPress: () => navigation.navigate('Register') }
        ]
      );
    } else {
      Alert.alert('Éxito', `¡Bienvenido ${data.name}!`);
      navigation.navigate('ClientHome', { name: data.name });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Inicio de Sesión</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#6B7280"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#6B7280"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotText}>Olvidé mi contraseña</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:20,
    backgroundColor:'#E0F2FF', // fondo azul claro
  },
  title: {
    fontSize:28,
    fontWeight:'bold',
    marginBottom:30,
    color:'#1E3A8A', // azul oscuro
  },
  input: {
    width:'100%',
    borderWidth:1,
    borderColor:'#3B82F6', // azul
    padding:15,
    marginBottom:15,
    borderRadius:10,
    backgroundColor:'#fff',
  },
  button: {
    width:'100%',
    paddingVertical:15,
    borderRadius:10,
    marginBottom:15,
    alignItems:'center',
    backgroundColor:'#2563EB', // azul fuerte
    shadowColor:'#000',
    shadowOffset:{ width:0, height:2 },
    shadowOpacity:0.25,
    shadowRadius:3.84,
    elevation:5,
  },
  buttonText: {
    color:'#fff',
    fontSize:18,
    fontWeight:'bold',
  },
  registerButton: {
    backgroundColor:'#3B82F6', // azul medio
  },
  registerText: {
    color:'#fff',
    fontWeight:'bold',
    fontSize:16,
  },
  forgotButton: {
    marginTop:10,
  },
  forgotText: {
    color:'#1E40AF',
    fontSize:16,
    textDecorationLine:'underline',
  },
});

