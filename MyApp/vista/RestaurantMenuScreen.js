import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { fetchMenuItems } from '../services/restaurantService';

export default function RestaurantMenuScreen({ route }) {
  const { restaurantId, restaurantName } = route.params;
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const loadMenu = async () => {
      const items = await fetchMenuItems(restaurantId);
      setMenuItems(items);
    };
    loadMenu();
  }, [restaurantId]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{restaurantName}</Text>
      {menuItems.length === 0 && <Text>No hay productos aún</Text>}
      {menuItems.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
          <Text style={styles.cardPrice}>${item.price}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  card: { marginBottom: 12, padding: 10, backgroundColor: '#FFF', borderRadius: 10 },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  cardDescription: { fontSize: 14 },
  cardPrice: { fontSize: 16, fontWeight: '600', marginTop: 5 },
});
