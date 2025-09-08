import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../supabase';

export default function RestaurantScreen({ route }) {
  const { userId, name } = route.params;
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  // Formulario de creación/edición
  const [restName, setRestName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');

  const categories = ['Hamburguesa', 'Pizza', 'Sushi', 'Postres', 'Bebidas'];

  useEffect(() => {
    const fetchRestaurant = async () => {
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('owner_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        Alert.alert('Error', 'No se pudo cargar el restaurante');
      } else {
        setRestaurant(data || null);
        if (data) {
          // Si ya existe, cargamos los datos en los inputs para edición
          setRestName(data.name);
          setDescription(data.description);
          setAddress(data.address);
          setCategory(data.category);
        }
      }
      setLoading(false);
    };
    fetchRestaurant();
  }, []);

  const handleCreateOrUpdate = async () => {
    if (!restName || !description || !address || !category) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (restaurant) {
      // Actualizar restaurante existente
      const { data, error } = await supabase
        .from('restaurants')
        .update({ name: restName, description, address, category })
        .eq('id', restaurant.id)
        .select()
        .single();

      if (error) Alert.alert('Error', error.message);
      else {
        Alert.alert('Éxito', 'Restaurante actualizado correctamente');
        setRestaurant(data);
      }
    } else {
      // Crear nuevo restaurante
      const { data, error } = await supabase
        .from('restaurants')
        .insert([{ owner_id: userId, name: restName, description, address, category }])
        .select()
        .single();

      if (error) Alert.alert('Error', error.message);
      else {
        Alert.alert('Éxito', 'Restaurante creado correctamente');
        setRestaurant(data);
      }
    }
  };

  if (loading) return <Text>Cargando...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {restaurant ? (
        <View style={styles.restaurantContainer}>
          <Text style={styles.title}>¡Bienvenido {name}!</Text>
          <Text style={styles.label}>Editar Restaurante</Text>

          <TextInput style={styles.input} value={restName} onChangeText={setRestName} />
          <TextInput style={styles.input} value={description} onChangeText={setDescription} />
          <TextInput style={styles.input} value={address} onChangeText={setAddress} />

          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Categoría:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryButton, category === cat && styles.categoryButtonSelected]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[styles.categoryText, category === cat && styles.categoryTextSelected]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Button title="Guardar cambios" onPress={handleCreateOrUpdate} />
        </View>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.title}>Crear tu restaurante</Text>
          <TextInput placeholder="Nombre del restaurante" style={styles.input} value={restName} onChangeText={setRestName} />
          <TextInput placeholder="Descripción" style={styles.input} value={description} onChangeText={setDescription} />
          <TextInput placeholder="Dirección" style={styles.input} value={address} onChangeText={setAddress} />

          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Selecciona categoría:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryButton, category === cat && styles.categoryButtonSelected]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[styles.categoryText, category === cat && styles.categoryTextSelected]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Button title="Crear restaurante" onPress={handleCreateOrUpdate} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1, alignItems: 'center', backgroundColor: '#E0F7FA' },
  restaurantContainer: { width: '100%', backgroundColor: '#FFFFFF', padding: 20, borderRadius: 12, alignItems: 'center', marginBottom: 20 },
  formContainer: { width: '100%', padding: 20, backgroundColor: '#FFFFFF', borderRadius: 12 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#00796B', marginBottom: 15, textAlign: 'center' },
  label: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { width: '100%', borderWidth: 1, borderColor: '#00796B', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12, marginBottom: 10 },
  categoryContainer: { flexDirection: 'row', marginBottom: 20 },
  categoryButton: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#B2DFDB', borderRadius: 20, marginRight: 8 },
  categoryButtonSelected: { backgroundColor: '#00796B' },
  categoryText: { color: '#004D40', fontWeight: '600', fontSize: 12 },
  categoryTextSelected: { color: '#FFFFFF' },
});
