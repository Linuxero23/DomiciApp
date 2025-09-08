import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, Alert } from 'react-native';
import { getDeliverer, createDeliverer, updateAvailability } from '../services/delivererService';

export default function DelivererScreen({ route }) {
  const { userId } = route.params; // id del usuario logueado
  const [isAvailable, setIsAvailable] = useState(true);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const loadDelivererStatus = async () => {
      try {
        let deliverer = await getDeliverer(userId);
        if (deliverer) {
          setIsAvailable(deliverer.is_available);
          setRating(deliverer.rating || 0);
        } else {
          await createDeliverer(userId);
        }
      } catch (error) {
        Alert.alert('Error', 'No se pudo cargar la información');
        console.error(error);
      }
    };

    loadDelivererStatus();
  }, [userId]);

  const toggleAvailability = async () => {
    const newStatus = !isAvailable;
    setIsAvailable(newStatus);
    try {
      await updateAvailability(userId, newStatus);
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el estado');
      setIsAvailable(!newStatus); // revertir en UI
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido Entregador</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Disponible:</Text>
        <Switch
          value={isAvailable}
          onValueChange={toggleAvailability}
          trackColor={{ false: '#f56565', true: '#48bb78' }}
          thumbColor="#ffffff"
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Calificación:</Text>
        <Text style={styles.rating}>{rating.toFixed(1)} ⭐</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:20,
    backgroundColor:'#E8F5E9',
  },
  title: {
    fontSize:24,
    fontWeight:'bold',
    marginBottom:30,
    color:'#388E3C'
  },
  row: {
    flexDirection:'row',
    alignItems:'center',
    marginBottom:20,
  },
  label: {
    fontSize:18,
    marginRight:10,
    color:'#2e7d32'
  },
  rating: {
    fontSize:18,
    fontWeight:'bold',
    color:'#388E3C'
  }
});
