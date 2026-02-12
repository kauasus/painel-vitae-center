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
        
        <Text style={styles.numero}>{senha.Tipo_Senha}{senha.Num_Sequencial.toString().padStart(4, '0')}</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>LOCAL</Text>
            <Text style={styles.infoValue}>{senha.Dsc_Localizacao}</Text>
          </View>
          
          <View style={styles.infoBox}>
          
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 20,
    padding: 25,
    marginTop: 100,
    width: '100%',
    fontSize: 450

    
    
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
    fontSize: 80,
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
