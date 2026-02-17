import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import LoadingScreen from './LoadingScreen'

type AppLoaderProps = {
  children: ReactNode
}

const MIN_LOAD_TIME_MS = 6500

const AppLoader = ({ children }: AppLoaderProps) => {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    let minTimeReached = false
    let loaded = false

    const maybeHide = () => {
      if (minTimeReached && loaded) {
        setShowLoader(false)
      }
    }

    const minTimer = window.setTimeout(() => {
      minTimeReached = true
      maybeHide()
    }, MIN_LOAD_TIME_MS)

    const handleLoad = () => {
      loaded = true
      maybeHide()
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }

    return () => {
      window.clearTimeout(minTimer)
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  return (
    <>
      {showLoader && <LoadingScreen />}
      <div className={showLoader ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        {children}
      </div>
    </>
  )
}

export default AppLoader

