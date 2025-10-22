import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function PaymentScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { total } = route.params || { total: 0 };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handlePay = () => {
    navigation.replace("TrackingScreen"); // 🔁 redirige a mapa tras “pagar”
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#00796B" />
          <Text style={styles.text}>Conectando con el simulador de pago...</Text>
        </View>
      ) : (
        <View style={styles.center}>
          <Text style={styles.title}>💳 Simulador de Pago</Text>
          <Text style={styles.amount}>Total a pagar: ${total.toLocaleString("es-CO")}</Text>
          <TouchableOpacity style={styles.button} onPress={handlePay}>
            <Text style={styles.buttonText}>Pagar con PSE / PayU (simulado)</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E0F7FA", justifyContent: "center" },
  center: { alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "#00796B", marginBottom: 10 },
  text: { fontSize: 16, color: "#00796B", marginTop: 20 },
  amount: { fontSize: 18, fontWeight: "bold", marginVertical: 15, color: "#004D40" },
  button: {
    backgroundColor: "#00796B",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: { color: "#FFF", fontWeight: "bold", fontSize: 16, textAlign: "center" },
});
