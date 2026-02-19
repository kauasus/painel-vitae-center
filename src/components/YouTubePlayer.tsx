import React, { useEffect } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { useVideoPlayer, VideoView } from 'expo-video'

interface YouTubePlayerProps {
  videoId: string
  isVisible: boolean
}

import videoSource from '../../assets/video-painel.mp4'

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  isVisible,
}) => {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true
    player.muted = true
    player.play()
  })

  useEffect(() => {
    // O vídeo continua rodando mesmo quando isVisible = false
    // Apenas mudamos a opacidade, não destruímos o iframe
  }, [isVisible])

  return (
    <View style={[styles.container, !isVisible && styles.hidden]}>
      <VideoView style={styles.video} player={player} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
  },
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },
  video: {
    flex: 1,
    backgroundColor: '#000',
  },
})
