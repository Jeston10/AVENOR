import { useEffect, useState } from 'react'
import LightPillar from './LightPillar'

const LOADING_TITLE = 'Welcome to Avenor'

const LoadingScreen = () => {
  const [visibleLength, setVisibleLength] = useState(0)

  useEffect(() => {
    if (visibleLength < LOADING_TITLE.length) {
      const t = setTimeout(() => setVisibleLength((n) => n + 1), 90)
      return () => clearTimeout(t)
    }
    const hold = setTimeout(() => setVisibleLength(0), 2200)
    return () => clearTimeout(hold)
  }, [visibleLength])

  const text = LOADING_TITLE.slice(0, visibleLength)

  return (
    <div className="fixed inset-0 z-[9999] bg-[#050718] overflow-hidden">
      <div className="relative w-full h-full">
        <div className="absolute inset-0">
          <LightPillar
            topColor="#5227FF"
            bottomColor="#FF9FFC"
            intensity={1}
            rotationSpeed={0.3}
            glowAmount={0.002}
            pillarWidth={3}
            pillarHeight={0.4}
            noiseIntensity={0.5}
            pillarRotation={25}
            interactive={false}
            mixBlendMode="screen"
            quality="high"
          />
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-6">
          <h1 className="font-display text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-center">
            {text}
            {visibleLength > 0 && visibleLength < LOADING_TITLE.length && (
              <span
                className="inline-block w-0.5 h-[0.9em] align-middle bg-[var(--color-primary)] ml-0.5 animate-pulse"
                aria-hidden
              />
            )}
          </h1>
          <p className="text-sm text-white/60 animate-pulse">Tap or click anywhere to begin</p>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen

