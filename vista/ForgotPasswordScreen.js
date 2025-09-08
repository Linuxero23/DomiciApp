import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform 
} from 'react-native';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleSendLink = () => {
    if(!email.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu email');
      return;
    }
    Alert.alert('Enviando enlace', `Se ha enviado un enlace a ${email}`);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Recuperar Contraseña</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#6B7280"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handleSendLink}>
        <Text style={styles.buttonText}>Enviar enlace</Text>
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
