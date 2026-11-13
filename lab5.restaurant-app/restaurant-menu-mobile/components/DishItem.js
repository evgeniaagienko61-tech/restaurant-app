import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function DishItem({ dish, onToggle, onDelete }) {
  return (
    <View style={[styles.item, dish.selected && styles.itemSelected]}>
      <TouchableOpacity 
        style={styles.textContainer} 
        onPress={() => onToggle(dish.id)}
      >
        <Text style={[styles.dishName, dish.selected && styles.textSelected]}>
          {dish.name}
        </Text>
        <Text style={[styles.dishPrice, dish.selected && styles.textSelected]}>
          {dish.price} грн
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => onDelete(dish.id)}
      >
        <Text style={styles.deleteButtonText}>Видалити</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  itemSelected: {
    backgroundColor: '#f0fdf4', // ніжний зеленватий фон при виборі
    borderColor: '#86efac',
  },
  textContainer: {
    flex: 1,
  },
  dishName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  dishPrice: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  textSelected: {
    color: '#166534',
    textDecorationLine: 'line-through', // або інше візуальне оформлення
  },
  deleteButton: {
    backgroundColor: '#fee2e2',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#991b1b',
    fontSize: 14,
    fontWeight: '600',
  },
});