import { useEffect, useState, useRef } from 'react'

const useClickedOutside = () => {
  const [isClickedOut, setIsClickedOut] = useState(true)

  const ref = useRef<HTMLElement>(null)

  const handleFocus = () => setIsClickedOut(false)

  const handleBlur = () => setIsClickedOut(true)

  useEffect(() => {
    const handleClick = (e: globalThis.MouseEvent) => {
      e.stopPropagation()
      if (!ref.current || !e.target) {
        return
      }
      setIsClickedOut(!ref.current.contains(e.target as Node))
    }

    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
  }, [ref])

  return { ref, isClickedOut, handleFocus, handleBlur, setIsClickedOut }
}

export default useClickedOutside
