import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Senha } from '../types'
import { COLORS } from '../constants/colors'

interface HistoricoProps {
  senhas: Senha[]
}

export const Historico: React.FC<HistoricoProps> = ({ senhas }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>ÚLTIMAS CHAMADAS</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {senhas.map((senha) => (
          <View key={senha.Cod_Senha_Atendimento} style={styles.card}>
            <Text style={styles.numero}>
              {senha.Tipo_Senha}
              {senha.nom_paciente
                ? senha.nom_paciente.slice(0, 20)
                : senha.Num_Sequencial.toString().padStart(4, '0')}
            </Text>
            <Text style={styles.numero}>{senha.Dsc_Localizacao}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    paddingLeft: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 15,
    textAlign: 'center',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    borderLeftWidth: 8,
    borderLeftColor: COLORS.primary,
    elevation: 3,
  },
  numero: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
  },
})
