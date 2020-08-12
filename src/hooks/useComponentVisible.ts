import { useEffect, useState, useRef } from 'react'

const useComponentVisible = () => {
  const [isVisible, setIsVisible] = useState(false)

  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleClick = (e: globalThis.MouseEvent) => {
      e.stopPropagation()
      if (!ref.current || !e.target) {
        return
      }
      setIsVisible(ref.current.contains(e.target as Node))
    }

    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
  }, [ref])

  return { ref, isVisible }
}

export default useComponentVisible
