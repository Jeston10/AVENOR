/**
 * Background music playlist – soothing, calm, professional.
 * 
 * OPTION 1: Local files (commit to git)
 *   - Place MP3 files in public/music/
 *   - Use paths like: '/music/ambient-calm.mp3'
 * 
 * OPTION 2: External hosting (CDN)
 *   - Upload to Vercel Blob, Cloudinary, AWS S3, etc.
 *   - Use full URLs like: 'https://[your-cdn-url]/ambient-calm.mp3'
 *   - See public/music/HOSTING_GUIDE.md for setup instructions
 * 
 * See public/music/README.md for royalty-free music sources.
 */
export interface Track {
  id: string
  title: string
  src: string
}

export const PLAYLIST: Track[] = [
  // External URLs hosted on Vercel Blob (see d:\Games\Avenor\musicUrl.md)
  { id: '1', title: 'Ambient Calm', src: 'https://clppobtwgbwodjxc.public.blob.vercel-storage.com/ambient-calm.mp3' },
  { id: '2', title: 'Soft Piano', src: 'https://clppobtwgbwodjxc.public.blob.vercel-storage.com/soft-piano.mp3' },
  { id: '3', title: 'Peaceful Waters', src: 'https://clppobtwgbwodjxc.public.blob.vercel-storage.com/peaceful-waters.mp3' },
  { id: '4', title: 'Gentle Keys', src: 'https://clppobtwgbwodjxc.public.blob.vercel-storage.com/gentle-keys.mp3' },
  { id: '5', title: 'Quiet Space', src: 'https://clppobtwgbwodjxc.public.blob.vercel-storage.com/quiet-space.mp3' },
  { id: '6', title: 'Morning Light', src: 'https://clppobtwgbwodjxc.public.blob.vercel-storage.com/morning-light.mp3' },
  { id: '7', title: 'Stillness', src: 'https://clppobtwgbwodjxc.public.blob.vercel-storage.com/stillness.mp3' },
  { id: '8', title: 'Reflection', src: 'https://clppobtwgbwodjxc.public.blob.vercel-storage.com/reflection.mp3' },
]
