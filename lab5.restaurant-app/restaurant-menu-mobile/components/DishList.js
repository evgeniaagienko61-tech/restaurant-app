import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import DishItem from './DishItem';

export default function DishList({ dishes, onToggle, onDelete }) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Меню ресторану</Text>
      
      {dishes.length === 0 ? (
        <Text style={styles.emptyText}>Меню порожнє. Додайте першу страву!</Text>
      ) : (
        <>
          <Text style={styles.hintText}>Торкніться страви, щоб змінити статус.</Text>
          <FlatList
            data={dishes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <DishItem dish={item} onToggle={onToggle} onDelete={onDelete} />
            )}
            keyboardShouldPersistTaps="handled"
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  hintText: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: 16,
    marginTop: 20,
  },
});