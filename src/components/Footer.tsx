import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export const Footer: React.FC = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>
        Por favor, dirija-se ao guichê indicado no painel.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: '8%',
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLORS.white,
    fontSize: 20,
    letterSpacing: 1,
  },
});
