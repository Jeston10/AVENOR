import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { PLAYLIST, type Track } from '../data/playlist'

const STORAGE_KEY = 'avenor-music-enabled'
const DEFAULT_VOLUME = 0.25

type MusicContextValue = {
  isPlaying: boolean
  muted: boolean
  volume: number
  currentTrack: Track | null
  playlist: Track[]
  play: () => void
  pause: () => void
  toggleMute: () => void
  setVolume: (value: number) => void
  autoplayBlocked: boolean
  requestPlay: () => void
}

const MusicContext = createContext<MusicContextValue | null>(null)

export function useMusic() {
  const ctx = useContext(MusicContext)
  if (!ctx) throw new Error('useMusic must be used within MusicProvider')
  return ctx
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [muted, setMutedState] = useState(false)
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)

  const currentTrack = PLAYLIST[currentIndex] ?? null
  const playlist = PLAYLIST

  // Create audio element once and wire events
  useEffect(() => {
    if (PLAYLIST.length === 0) return
    const audio = new Audio()
    audio.preload = 'metadata'
    audio.addEventListener('ended', () => {
      setCurrentIndex((i) => (i + 1) % PLAYLIST.length)
    })
    audio.addEventListener('error', () => {
      setCurrentIndex((i) => (i + 1) % PLAYLIST.length)
    })
    audio.addEventListener('play', () => setIsPlaying(true))
    audio.addEventListener('pause', () => setIsPlaying(false))
    audioRef.current = audio
    return () => {
      audio.pause()
      audio.src = ''
      audioRef.current = null
    }
  }, [])

  // Load and play current track (runs on mount and when currentIndex changes)
  useEffect(() => {
    const audio = audioRef.current
    const track = PLAYLIST[currentIndex]
    if (!audio || !track) return
    audio.src = track.src
    audio.volume = muted ? 0 : volume
    audio.play().then(() => setAutoplayBlocked(false)).catch(() => setAutoplayBlocked(true))
    return () => audio.pause()
  }, [currentIndex, muted, volume])

  const play = useCallback(() => {
    const audio = audioRef.current
    const track = PLAYLIST[currentIndex]
    if (!audio || !track) return
    if (audio.src !== track.src || !audio.src) audio.src = track.src
    audio.volume = muted ? 0 : volume
    audio.play().then(() => setAutoplayBlocked(false)).catch(() => setAutoplayBlocked(true))
  }, [currentIndex, muted, volume])

  const pause = useCallback(() => {
    audioRef.current?.pause()
  }, [])

  const toggleMute = useCallback(() => {
    setMutedState((m) => !m)
  }, [])

  const setVolume = useCallback((value: number) => {
    const v = Math.max(0, Math.min(1, value))
    setVolumeState(v)
    if (v > 0) setMutedState(false)
  }, [])

  const requestPlay = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore
    }
    play()
  }, [play])

  // Start music on first user interaction (browsers block autoplay until then)
  const startedByUserRef = useRef(false)
  useEffect(() => {
    if (PLAYLIST.length === 0) return
    const startOnInteraction = () => {
      if (startedByUserRef.current) return
      startedByUserRef.current = true
      requestPlay()
      document.removeEventListener('click', startOnInteraction)
      document.removeEventListener('keydown', startOnInteraction)
      document.removeEventListener('touchstart', startOnInteraction)
    }
    document.addEventListener('click', startOnInteraction, { once: true })
    document.addEventListener('keydown', startOnInteraction, { once: true })
    document.addEventListener('touchstart', startOnInteraction, { once: true })
    return () => {
      document.removeEventListener('click', startOnInteraction)
      document.removeEventListener('keydown', startOnInteraction)
      document.removeEventListener('touchstart', startOnInteraction)
    }
  }, [requestPlay])

  const value: MusicContextValue = {
    isPlaying,
    muted,
    volume,
    currentTrack,
    playlist,
    play,
    pause,
    toggleMute,
    setVolume,
    autoplayBlocked,
    requestPlay,
  }

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
}
