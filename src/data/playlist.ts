/**
 * Background music playlist – soothing, calm, professional.
 * Add your own MP3 files to public/music/ and name them as below (or update paths).
 * See public/music/README.md for royalty-free sources and suggestions.
 */
export interface Track {
  id: string
  title: string
  src: string
}

export const PLAYLIST: Track[] = [
  { id: '1', title: 'Ambient Calm', src: '/music/ambient-calm.mp3' },
  { id: '2', title: 'Soft Piano', src: '/music/soft-piano.mp3' },
  { id: '3', title: 'Peaceful Waters', src: '/music/peaceful-waters.mp3' },
  { id: '4', title: 'Gentle Keys', src: '/music/gentle-keys.mp3' },
  { id: '5', title: 'Quiet Space', src: '/music/quiet-space.mp3' },
  { id: '6', title: 'Morning Light', src: '/music/morning-light.mp3' },
  { id: '7', title: 'Stillness', src: '/music/stillness.mp3' },
  { id: '8', title: 'Reflection', src: '/music/reflection.mp3' },
]
