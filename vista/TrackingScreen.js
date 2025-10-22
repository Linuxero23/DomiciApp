import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../context/CartContext"; // ✅ ruta corregida

export default function TrackingScreen() {
  const navigation = useNavigation();
  const { clearCart } = useCart(); // ✅ seguro, porque ahora el provider sí envuelve la app
  const [loading, setLoading] = useState(true);
  const [deliveryPosition, setDeliveryPosition] = useState({
    latitude: 4.60971,
    longitude: -74.08175,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleGoHome = () => {
    clearCart();
    navigation.navigate("ClientScreen"); // ✅ asegúrate de que este nombre exista en App.js
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00796B" />
          <Text style={styles.loadingText}>Buscando repartidor para tu pedido...</Text>
        </View>
      ) : (
        <>
          <Text style={styles.title}>🚴‍♂️ Tu pedido está en camino</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: deliveryPosition.latitude,
              longitude: deliveryPosition.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={deliveryPosition}
              title="Repartidor"
              description="Tu pedido viene en camino"
            />
          </MapView>

          <TouchableOpacity style={styles.button} onPress={handleGoHome}>
            <Text style={styles.buttonText}>Volver al inicio</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E0F7FA" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00796B",
    textAlign: "center",
    marginVertical: 10,
  },
  map: { flex: 1, margin: 10, borderRadius: 10 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 20, fontSize: 18, color: "#00796B", fontWeight: "bold" },
  button: {
    backgroundColor: "#00796B",
    paddingVertical: 15,
    marginHorizontal: 40,
    borderRadius: 10,
    marginBottom: 25,
  },
  buttonText: { color: "#FFF", textAlign: "center", fontSize: 18, fontWeight: "bold" },
});
