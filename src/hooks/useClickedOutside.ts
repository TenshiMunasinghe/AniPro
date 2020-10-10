import { useEffect, useState, useRef } from 'react'

export const useClickedOutside = () => {
  const ref = useRef<HTMLElement>(null)
  const [isClickedOut, setIsClickedOut] = useState(true)

  const handleEvent = (e: any) => {
    if (ref.current && e.target) {
      setIsClickedOut(!ref.current.contains(e.target as Node))
    }
  }

  useEffect(() => {
    if (window.PointerEvent) {
      document.addEventListener('pointerdown', handleEvent)
    } else {
      document.addEventListener('mousedown', handleEvent)
      document.addEventListener('touchstart', handleEvent)
    }

    return () => {
      if (window.PointerEvent) {
        document.removeEventListener('pointerdown', handleEvent)
      } else {
        document.removeEventListener('mousedown', handleEvent)
        document.removeEventListener('touchstart', handleEvent)
      }
    }
  }, [])

  return { ref, isClickedOut }
}
