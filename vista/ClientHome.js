import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { supabase } from '../supabase';

export default function ClientHome({ navigation, route }) {
  const { name, email } = route.params; // email del usuario pasado desde login/register
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Consulta el rol del usuario al cargar la pantalla
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('name', name)
          .single();

        if (error) {
          Alert.alert('Error', 'No se pudo consultar tu rol');
          setLoading(false);
          return;
        }

        if (data.role) {
          // Si ya tiene rol, navega directo
          navigateByRole(data.role);
        } else {
          // Si no tiene rol, mostrar opciones
          setRole(null);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        Alert.alert('Error', 'Ocurrió un error inesperado');
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

  const navigateByRole = (selectedRole) => {
    if (selectedRole === 'Cliente') navigation.replace('ClientScreen', { name });
    else if (selectedRole === 'Restaurante') navigation.replace('RestaurantScreen', { name });
    else if (selectedRole === 'Entregador') navigation.replace('DelivererScreen', { name });
  };

  const handleOption = async (option) => {
    // Actualiza rol en la base de datos solo si es null
    const { data, error } = await supabase
      .from('users')
      .update({ role: option })
      .eq('name', name);

    if (error) {
      Alert.alert('Error', 'No se pudo guardar tu opción');
      return;
    }

    setRole(option);
    navigateByRole(option);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {role === null && (
        <>
          <Text style={styles.title}>¡Hola {name}!</Text>
          <Text style={styles.subtitle}>
            Nos gustaría conocerte y saber quién eres, pero antes nos gustaría saber qué buscas:
          </Text>

          <TouchableOpacity style={[styles.button, styles.client]} onPress={() => handleOption('Cliente')}>
            <Text style={styles.buttonText}>Soy cliente</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.restaurant]} onPress={() => handleOption('Restaurante')}>
            <Text style={styles.buttonText}>Soy restaurante</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.deliverer]} onPress={() => handleOption('Entregador')}>
            <Text style={styles.buttonText}>Soy entregador</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:20,
    backgroundColor:'#E0F2FF',
  },
  title: {
    fontSize:28,
    fontWeight:'bold',
    marginBottom:10,
    color:'#1E3A8A',
  },
  subtitle: {
    fontSize:16,
    textAlign:'center',
    marginBottom:30,
    color:'#1E40AF',
  },
  button: {
    width:'80%',
    paddingVertical:15,
    borderRadius:12,
    marginBottom:15,
    alignItems:'center',
    shadowColor:'#000',
    shadowOffset:{ width:0, height:2 },
    shadowOpacity:0.25,
    shadowRadius:3.84,
    elevation:5,
  },
  client: {
    backgroundColor:'#2563EB',
  },
  restaurant: {
    backgroundColor:'#3B82F6',
  },
  deliverer: {
    backgroundColor:'#60A5FA',
  },
  buttonText: {
    color:'#fff',
    fontSize:18,
    fontWeight:'bold',
  },
});
