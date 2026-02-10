import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { Header } from './src/components/Header';
import { SenhaAtual } from './src/components/SenhaAtual';
import { Historico } from './src/components/Historico';
import { Footer } from './src/components/Footer';
import { useSenhas } from './src/hooks/useSenhas';
import { formatarHora } from './src/utils/formatters';
import { COLORS } from './src/constants/colors';

export default function App() {
  const { senhaAtual, historico, loading, error } = useSenhas();
  const [relogio, setRelogio] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setRelogio(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      
      <Header relogio={formatarHora(relogio)} />
      
      <View style={styles.content}>
        <SenhaAtual senha={senhaAtual} />
        <Historico senhas={historico} />
      </View>
      
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
  },
});
