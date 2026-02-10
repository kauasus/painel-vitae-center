import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Senha } from '../types';
import { COLORS } from '../constants/colors';

interface SenhaAtualProps {
  senha: Senha | null;
}

export const SenhaAtual: React.FC<SenhaAtualProps> = ({ senha }) => {
  if (!senha) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.card}>
          <Text style={styles.aguardando}>Aguardando próxima senha...</Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.card}>
        <Text style={styles.label}>SENHA ATUAL</Text>
        <Text style={styles.numero}>{senha.numero}</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>LOCAL</Text>
            <Text style={styles.infoValue}>GUICHÊ {senha.guiche}</Text>
          </View>
          <View style={styles.divisor} />
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>SERVIÇO</Text>
            <Text style={styles.infoValue}>{senha.tipo}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    paddingRight: 10,
  },
  card: {
    flex: 1,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  label: {
    fontSize: 30,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: 'bold',
    letterSpacing: 4,
  },
  numero: {
    fontSize: 180,
    fontWeight: '900',
    color: COLORS.white,
    marginVertical: -10,
  },
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 20,
    padding: 25,
    marginTop: 20,
    width: '80%',
    justifyContent: 'space-around',
  },
  infoBox: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  divisor: {
    width: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  aguardando: {
    fontSize: 36,
    color: 'rgba(255,255,255,0.7)',
    fontStyle: 'italic',
  },
});
