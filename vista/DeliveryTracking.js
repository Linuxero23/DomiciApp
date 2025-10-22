// vista/DeliveryTracking.js
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, StyleSheet } from 'react-native';

export default function DeliveryTracking() {
  const [riderPosition, setRiderPosition] = useState({
    latitude: 4.711, // ejemplo Bogotá
    longitude: -74.072,
  });

  const userLocation = {
    latitude: 4.65,
    longitude: -74.05,
  };

  // 🚴‍♂️ Simular movimiento del domiciliario
  useEffect(() => {
    const interval = setInterval(() => {
      setRiderPosition((prev) => ({
        latitude: prev.latitude - 0.001,
        longitude: prev.longitude + 0.001,
      }));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.info}>🛵 Tu pedido está en camino...</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 4.68,
          longitude: -74.06,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker coordinate={riderPosition} title="Domiciliario" description="Viene hacia ti 🏍️" />
        <Marker coordinate={userLocation} pinColor="blue" title="Tu ubicación" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  info: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796B',
    marginVertical: 10,
  },
});
