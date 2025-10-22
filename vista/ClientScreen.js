import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { fetchRestaurants } from '../services/restaurantService';
import { useCart } from '../context/CartContext'; // ✅ Importamos el contexto del carrito

export default function ClientScreen({ navigation }) {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
    const navigation = useNavigation();

  const handleTrackOrder = () => {
    navigation.navigate("TrackingScreen"); // 👈 Navega al mapa
  };

  // ✅ Hook del carrito
  const { cart } = useCart();

  const categories = ['Hamburguesa', 'Pizza', 'Sushi', 'Postres', 'Bebidas'];

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const data = await fetchRestaurants();
        setRestaurants(data);
        setFilteredRestaurants(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadRestaurants();
  }, []);

  // Filtra por nombre y categoría
  useEffect(() => {
    let filtered = restaurants;

    if (search) {
      filtered = filtered.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (r) => r.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredRestaurants(filtered);
  }, [search, selectedCategory, restaurants]);

  // 🔢 Calcula la cantidad total de productos en el carrito
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={{ flex: 1, backgroundColor: '#E0F7FA' }}>
      {/* Encabezado con botón de carrito */}
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenido Cliente</Text>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('CartScreen')}
        >
          <Text style={styles.cartIcon}>🛒</Text>
          {totalItems > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Barra de búsqueda */}
        <TextInput
          placeholder="Buscar restaurante por nombre..."
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          onFocus={() => setShowCategories(true)}
          onBlur={() => setShowCategories(false)}
        />

        {/* Filtros de categoría */}
        {showCategories && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryContainer}
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  selectedCategory === cat && styles.categoryButtonSelected,
                ]}
                onPress={() =>
                  setSelectedCategory(selectedCategory === cat ? null : cat)
                }
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === cat && styles.categoryTextSelected,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Restaurantes filtrados */}
        {filteredRestaurants.length === 0 && (
          <Text style={styles.noData}>No se encontraron restaurantes</Text>
        )}

        {filteredRestaurants.map((r) => (
          <TouchableOpacity
            key={r.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate('RestaurantMenuScreen', {
                restaurantId: r.id,
                restaurantName: r.name,
              })
            }
          >
            <Text style={styles.cardTitle}>{r.name}</Text>
            {r.category && (
              <Text style={styles.cardCategory}>{r.category}</Text>
            )}
            <Text style={styles.cardDescription}>{r.description}</Text>
            <Text style={styles.cardAddress}>{r.address}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#B2DFDB',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00796B',
  },
  cartButton: {
    position: 'relative',
    backgroundColor: '#00796B',
    borderRadius: 25,
    padding: 8,
  },
  cartIcon: {
    fontSize: 22,
    color: '#FFF',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#E53935',
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  cartBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchInput: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#00796B',
    color: '#00796B',
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  categoryButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#B2DFDB',
    borderRadius: 20,
    marginRight: 8,
    alignItems: 'center',
  },
  categoryButtonSelected: {
    backgroundColor: '#00796B',
  },
  categoryText: {
    color: '#004D40',
    fontWeight: '600',
    fontSize: 12,
  },
  categoryTextSelected: {
    color: '#FFFFFF',
  },
  noData: {
    fontSize: 16,
    color: '#555',
    marginTop: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 5,
  },
  cardCategory: {
    fontSize: 14,
    color: '#004D40',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  cardDescription: {
    fontSize: 14,
    color: '#004D40',
    marginBottom: 3,
  },
  cardAddress: {
    fontSize: 14,
    color: '#00796B',
  },
});
