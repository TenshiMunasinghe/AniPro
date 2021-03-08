import { useEffect, useRef, useState } from 'react';

export const useFocusedWithin = () => {
  const ref = useRef<HTMLElement>(null)
  const [isFocused, setIsFocused] = useState(false)

  const onFocus = (e: FocusEvent) => {
    if (!ref.current) return
    if (e.relatedTarget && ref.current.contains(e.relatedTarget as Node)) return
    setIsFocused(true)
  }
  const onBlur = (e: FocusEvent) => {
    if (!ref.current) return
    if (e.relatedTarget && ref.current.contains(e.relatedTarget as Node)) return
    setIsFocused(false)
  }

  useEffect(() => {
    const element = ref.current
    if (element && window.FocusEvent) {
      element.addEventListener('focusin', onFocus)
      element.addEventListener('focusout', onBlur)
    }

    return () => {
      if (element && window.FocusEvent) {
        element.removeEventListener('focusin', onFocus)
        element.removeEventListener('focusout', onBlur)
      }
    }
  }, [])

  return { ref, isFocused }
}
