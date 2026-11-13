import React, { useState } from 'react';
import { StyleSheet, View, Alert, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './components/Header';
import DishForm from './components/DishForm';
import DishList from './components/DishList';

export default function App() {
  const [dishes, setDishes] = useState([]);

  const addDish = (name, price) => {
    if (!name.trim() || !price.trim()) {
      Alert.alert('Помилка', 'Будь ласка, заповніть назву страви та ціну.');
      return false;
    }
    
    const newDish = {
      id: Date.now().toString(),
      name: name.trim(),
      price: price.trim(),
      selected: false,
    };

    setDishes((currentDishes) => [newDish, ...currentDishes]);
    Alert.alert('Успіх', 'Страву успішно додано до меню!');
    return true;
  };

  const toggleDish = (id) => {
    setDishes((currentDishes) =>
      currentDishes.map((dish) =>
        dish.id === id ? { ...dish, selected: !dish.selected } : dish
      )
    );
  };

  const deleteDish = (id) => {
    Alert.alert(
      'Видалення',
      'Ви дійсно хочете видалити цю страву з меню?',
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: () => {
            setDishes((currentDishes) => currentDishes.filter((dish) => dish.id !== id));
          },
        },
      ]
    );
  };

  const selectedCount = dishes.filter((dish) => dish.selected).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <View style={styles.container}>
        <Header total={dishes.length} selected={selectedCount} />
        <DishForm onAdd={addDish} />
        <DishList dishes={dishes} onToggle={toggleDish} onDelete={deleteDish} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flex: 1,
    padding: 20,
  },
});