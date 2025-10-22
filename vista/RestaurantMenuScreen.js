import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { fetchMenuItems } from '../services/restaurantService';
import { useCart } from '../context/CartContext';

export default function RestaurantMenuScreen({ route }) {
  const { restaurantId, restaurantName } = route.params;
  const [menuItems, setMenuItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const { addToCart, cart } = useCart();

  const formatPrice = (value) =>
    typeof value === 'number' ? value.toLocaleString('es-CO') : value;

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const items = await fetchMenuItems(restaurantId);
        setMenuItems(items);

        // 🔁 Mantener cantidades previas si ya estaban en el carrito
        const existing = {};
        items.forEach((item) => {
          const found = cart.find((c) => c.id === item.id);
          if (found) existing[item.id] = found.quantity;
        });
        setQuantities(existing);
      } catch (error) {
        console.error(error);
      }
    };
    loadMenu();
  }, [restaurantId, cart]);

  const handleQuantityChange = (id, change) => {
    setQuantities((prev) => {
      const newQty = (prev[id] || 0) + change;
      if (newQty < 0) return prev;
      return { ...prev, [id]: newQty };
    });
  };

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 0;
    if (quantity <= 0) {
      Alert.alert('Aviso', 'Selecciona una cantidad válida antes de agregar.');
      return;
    }
    addToCart(item, quantity);
    Alert.alert('✅ Agregado', `${item.name} se añadió al carrito.`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{restaurantName}</Text>

      {menuItems.length === 0 ? (
        <Text style={styles.noData}>Este restaurante aún no tiene productos 🍽️</Text>
      ) : (
        menuItems.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardPrice}>${formatPrice(item.price)}</Text>
            </View>

            <Text style={styles.cardDescription}>{item.description}</Text>
            {item.category && (
              <Text style={styles.cardCategory}>🍴 {item.category}</Text>
            )}

            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={[styles.qtyButton, styles.qtyMinus]}
                onPress={() => handleQuantityChange(item.id, -1)}
              >
                <Text style={styles.qtyText}>-</Text>
              </TouchableOpacity>

              <Text style={styles.qtyValue}>{quantities[item.id] || 0}</Text>

              <TouchableOpacity
                style={[styles.qtyButton, styles.qtyPlus]}
                onPress={() => handleQuantityChange(item.id, +1)}
              >
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAddToCart(item)}
              >
                <Text style={styles.addButtonText}>🛒</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#F8FAFC', flexGrow: 1 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#00796B', marginBottom: 20, textAlign: 'center' },
  noData: { textAlign: 'center', color: '#555', fontSize: 16, marginTop: 40 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#004D40' },
  cardPrice: { fontSize: 16, fontWeight: 'bold', color: '#00796B' },
  cardDescription: { fontSize: 14, color: '#333', marginBottom: 5 },
  cardCategory: { fontSize: 12, color: '#777', fontStyle: 'italic' },
  quantityContainer: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 10 },
  qtyButton: { borderRadius: 20, width: 35, height: 35, justifyContent: 'center', alignItems: 'center' },
  qtyMinus: { backgroundColor: '#E57373' },
  qtyPlus: { backgroundColor: '#81C784' },
  qtyText: { fontSize: 20, color: '#FFF', fontWeight: 'bold' },
  qtyValue: { marginHorizontal: 10, fontSize: 18, fontWeight: 'bold', color: '#004D40' },
  addButton: { marginLeft: 10, backgroundColor: '#00796B', borderRadius: 20, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  addButtonText: { fontSize: 20, color: '#FFF' },
});
