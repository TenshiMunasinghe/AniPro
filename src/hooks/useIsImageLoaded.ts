import { useState, useRef, useEffect } from 'react'

export const useIsImageLoaded = (src: string) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const mountedRef = useRef(true)

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  const img = new Image()
  img.src = src
  img.onload = () => {
    if (!mountedRef.current) {
      return
    }
    setIsImageLoaded(true)
  }
  img.onerror = () => {
    if (!mountedRef.current) {
      return
    }
    setIsImageLoaded(false)
  }
  return { isImageLoaded, src: img.src }
}
