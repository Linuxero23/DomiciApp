import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform 
} from 'react-native';
import { supabase } from '../supabase';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password }]);

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Éxito', 'Usuario registrado correctamente');
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Registro</Text>

      <TextInput
        placeholder="Nombre"
        placeholderTextColor="#6B7280"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

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

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Volver al inicio</Text>
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
    backgroundColor:'#E0F2FF', // azul claro
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
  backButton: {
    marginTop:10,
  },
  backText: {
    color:'#1E40AF',
    fontSize:16,
    textDecorationLine:'underline',
  },
});
