import React, { useState, useEffect } from 'react'
import { View, StyleSheet, StatusBar, Animated } from 'react-native'
import { SenhaAtual } from './src/components/SenhaAtual'
import { Historico } from './src/components/Historico'
import * as Speech from 'expo-speech'
import { YouTubePlayer } from './src/components/YouTubePlayer'
import { useSenhas } from './src/hooks/useSenhas'
import { COLORS } from './src/constants/colors'
import { useAudioPlayer } from 'expo-audio'
import { Senha } from '@/types'

import audioSource from './assets/sound.mp3'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ConfigPainelModal } from '@/components/ConfigPainelModal'

const YOUTUBE_VIDEO_ID = 'ORPyOp_WFpU'
const TEMPO_EXIBICAO_SENHA = 7000 // 14 segundos (2 ciclos de 7s)
const TEMPO_EXTRA_ESPERA = 1000 // 3 segundos extras antes de voltar ao vídeo

export default function App() {
  const [andar, setAndar] = useState<string | null>(null)
  const [modalVisivel, setModalVisivel] = useState(false)
  const [mostrarPainel, setMostrarPainel] = useState(false)
  const [fadeAnim] = useState(new Animated.Value(0))
  const [historico, setHistorico] = useState<Senha[]>([])
  const { senhaAtual, novaSenhaChamada, resetNovaSenha } = useSenhas(andar)
  const sound = useAudioPlayer(audioSource)

  useEffect(() => {
    const carregarConfig = async () => {
      const salvo = await AsyncStorage.getItem('@painel_andar')
      if (salvo) {
        setAndar(salvo)
      } else {
        setModalVisivel(true)
      }
    }
    carregarConfig()
  }, [])

  useEffect(() => {
    if (senhaAtual) {
      setHistorico((prev) => {
        const jaExiste = prev.some(
          (s) => s.Cod_Senha_Atendimento === senhaAtual.Cod_Senha_Atendimento,
        )
        if (jaExiste) return prev
        return [senhaAtual, ...prev].slice(0, 10)
      })
    }
  }, [senhaAtual])

  const speak = (frase: string) => {
    sound.seekTo(0)
    sound.play()
    Speech.speak(frase, { language: 'pt-BR', voice: 'pt-br-x-afs-local' })
  }

  const salvarAndar = (novoAndar: string) => {
    setAndar(novoAndar)
    setModalVisivel(false)
  }

  // Detectar nova senha e alternar para o painel
  useEffect(() => {
    if (novaSenhaChamada) {
      // Mostrar painel com fade in
      setMostrarPainel(true)
      if (senhaAtual) {
        senhaAtual.nom_paciente
          ? speak(`${senhaAtual.nom_paciente})}, ${senhaAtual.Dsc_Localizacao}`)
          : speak(
              `Senha ${senhaAtual.Num_Sequencial})}, favor comparecer ao ${senhaAtual.Dsc_Localizacao}`,
            )
      } else return

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start()

      // Após 14 segundos (2 chamadas de 7s), esperar mais 3s e voltar para o vídeo
      const timeout = setTimeout(() => {
        // Espera extra de 3 segundos
        setTimeout(() => {
          // Fade out do painel
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
          }).start(() => {
            setMostrarPainel(false)
            resetNovaSenha()
          })
        }, TEMPO_EXTRA_ESPERA)
      }, TEMPO_EXIBICAO_SENHA)
      return () => clearTimeout(timeout)
    }
  }, [novaSenhaChamada, fadeAnim, resetNovaSenha])

  return (
    <View style={styles.container}>
      <ConfigPainelModal visible={modalVisivel} onSave={salvarAndar} />
      <StatusBar hidden />

      {/* Conteúdo principal */}
      <View style={styles.content}>
        {/* CAIXA DA SENHA + VÍDEO (mesma área) */}
        <View style={styles.senhaBox}>
          {/* Vídeo do YouTube (sempre rodando no fundo) */}
          <YouTubePlayer
            videoId={YOUTUBE_VIDEO_ID}
            isVisible={!mostrarPainel}
          />

          {/* Painel de senha (aparece por cima do vídeo) */}
          {mostrarPainel && (
            <>
              <Animated.View
                style={[styles.painelInterno, { opacity: fadeAnim }]}
              >
                <SenhaAtual senha={senhaAtual} />
              </Animated.View>
            </>
          )}
        </View>

        {/* Histórico de senhas (lateral direita) */}
        <Historico senhas={historico} />
      </View>
    </View>
  )
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
  senhaBox: {
    flex: 0.7,
    backgroundColor: 'transparent',
    borderRadius: 25,
    overflow: 'hidden',
    position: 'relative',
  },
  painelInterno: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})
