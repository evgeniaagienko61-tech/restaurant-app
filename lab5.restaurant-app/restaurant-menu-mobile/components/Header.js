import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header({ total, selected }) {
  return (
    <View>
      <Text style={styles.title}>Restaurant Menu Mobile</Text>
      <Text style={styles.stats}>
        Усього страв: {total} | Обрано: {selected}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#b91c1c', // насичений бордово-червоний ресторанний стиль
    textAlign: 'center',
    marginBottom: 8,
  },
  stats: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 20,
  },
});