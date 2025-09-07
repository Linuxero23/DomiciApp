import React, { useEffect, useState, navigate } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { fetchRestaurants } from '../services/restaurantService';

export default function ClientScreen({ navigation }) {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategories, setShowCategories] = useState(false); // solo mostrar al enfocar la barra

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bienvenido Cliente</Text>

      {/* Barra de búsqueda */}
      <TextInput
        placeholder="Buscar restaurante por nombre..."
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch}
        onFocus={() => setShowCategories(true)}
        onBlur={() => setShowCategories(false)}
      />

      {/* Filtros de categoría solo si se selecciona la barra */}
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
          {r.category && <Text style={styles.cardCategory}>{r.category}</Text>}
          <Text style={styles.cardDescription}>{r.description}</Text>
          <Text style={styles.cardAddress}>{r.address}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#E0F7FA',
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 15,
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
