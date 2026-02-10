import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

interface HeaderProps {
  relogio: string;
}

export const Header: React.FC<HeaderProps> = ({ relogio }) => {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoVitae}>VITAE</Text>
        <Text style={styles.logoCenter}>Center</Text>
        <View style={styles.linhaDecorativa} />
        <Text style={styles.logoSub}>CLÍNICA MÉDICA E ODONTOLÓGICA</Text>
      </View>
      
      <View style={styles.relogioContainer}>
        <Text style={styles.relogioText}>{relogio}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 50,
    backgroundColor: COLORS.white,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.primary,
  },
  logoContainer: {
    flexDirection: 'column',
  },
  logoVitae: {
    fontSize: 38,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 5,
    lineHeight: 38,
  },
  logoCenter: {
    fontSize: 22,
    color: COLORS.secondary,
    fontStyle: 'italic',
    marginTop: -5,
  },
  logoSub: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  linhaDecorativa: {
    height: 1,
    backgroundColor: COLORS.border,
    width: '100%',
    marginVertical: 2,
  },
  relogioContainer: {
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  relogioText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.black,
  },
});
