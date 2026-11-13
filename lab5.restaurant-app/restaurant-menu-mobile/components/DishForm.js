import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function DishForm({ onAdd }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = () => {
    const success = onAdd(name, price);
    if (success) {
      setName('');
      setPrice('');
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Додати нову страву</Text>
      <TextInput
        style={styles.input}
        placeholder="Введіть назву страви"
        placeholderTextColor="#94a3b8"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Введіть ціну (грн)"
        placeholderTextColor="#94a3b8"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
        onSubmitEditing={handleAdd}
        returnKeyType="done"
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Додати до меню</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#f8fafc',
  },
  addButton: {
    backgroundColor: '#dc2626', // червоний акцент для ресторану
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});