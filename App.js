import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./vista/LoginScreen";
import RegisterScreen from "./vista/RegisterScreen";
import ForgotPasswordScreen from "./vista/ForgotPasswordScreen";
import ClientHome from "./vista/ClientHome";
import ClientScreen from "./vista/ClientScreen";
import RestaurantScreen from "./vista/RestaurantScreen";
import DelivererScreen from "./vista/DelivererScreen";
import RestaurantMenuScreen from "./vista/RestaurantMenuScreen";
import CartScreen from "./vista/CartScreen";
import TrackingScreen from "./vista/TrackingScreen"
import PaymentScreen from "./vista/PaymentScreen";
;

import { CartProvider } from "./context/CartContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="ClientHome" component={ClientHome} />
          <Stack.Screen name="ClientScreen" component={ClientScreen} />
          <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
          <Stack.Screen name="DelivererScreen" component={DelivererScreen} />
          <Stack.Screen name="RestaurantMenuScreen" component={RestaurantMenuScreen} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
          <Stack.Screen name="TrackingScreen" component={TrackingScreen} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
