import React, { useState } from 'react'
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS } from '../constants/colors'

interface Props {
  visible: boolean
  onSave: (andar: string) => void
}

export const ConfigPainelModal: React.FC<Props> = ({ visible, onSave }) => {
  const [andar, setAndar] = useState('')

  const handleSave = async () => {
    if (andar.trim()) {
      await AsyncStorage.setItem('@painel_andar', andar)
      onSave(andar)
    }
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Configuração do Painel</Text>
          <Text style={styles.label}>Informe o Andar / Setor:</Text>

          <TextInput
            style={styles.input}
            keyboardType='numeric'
            placeholder="Ex: 1º Andar"
            placeholderTextColor="#999"
            value={andar}
            onChangeText={setAndar}
            autoFocus // Já abre o teclado na TV
          />

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>SALVAR E INICIAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 400,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
})
