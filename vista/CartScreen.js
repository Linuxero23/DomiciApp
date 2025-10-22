import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../context/CartContext';

export default function CartScreen({ navigation }) {
  const { cart, updateQuantity, removeFromCart, getTotal } = useCart();

  // ✅ Redirige al simulador de pago, enviando el total como parámetro
   const handleCheckout = () => {
    const total = getTotal();
    if (cart.length === 0) {
      alert("Tu carrito está vacío 🛒");
      return;
    }
    navigation.navigate("PaymentScreen", { total }); // 👈 Pasa el total al pago
  };3

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Tu carrito</Text>

      {cart.length === 0 ? (
        <Text style={styles.empty}>No hay productos en el carrito</Text>
      ) :     (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>${item.price.toLocaleString('es-CO')}</Text>
                </View>

                <View style={styles.qtyContainer}>
                  <TouchableOpacity
                    style={[styles.qtyButton, styles.qtyMinus]}
                    onPress={() =>
                      item.quantity > 1
                        ? updateQuantity(item.id, item.quantity - 1)
                        : removeFromCart(item.id)
                    }
                  >
                    <Text style={styles.qtyText}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.qtyValue}>{item.quantity}</Text>

                  <TouchableOpacity
                    style={[styles.qtyButton, styles.qtyPlus]}
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Text style={styles.qtyText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>
              Total: ${getTotal().toLocaleString('es-CO')}
            </Text>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutText}>Finalizar pedido</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E0F7FA', padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 20,
    textAlign: 'center',
  },
  empty: { fontSize: 16, color: '#555', textAlign: 'center', marginTop: 50 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#00796B' },
  itemPrice: { color: '#004D40' },
  qtyContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyButton: {
    borderRadius: 20,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyMinus: { backgroundColor: '#E57373' },
  qtyPlus: { backgroundColor: '#81C784' },
  qtyText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  qtyValue: { marginHorizontal: 10, fontSize: 16, fontWeight: 'bold' },
  totalContainer: { marginTop: 20, alignItems: 'center' },
  totalText: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  checkoutButton: {
    backgroundColor: '#00796B',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  checkoutText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});
