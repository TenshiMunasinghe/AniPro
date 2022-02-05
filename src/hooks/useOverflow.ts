import { useLayoutEffect, useRef, useState } from 'react'
import { useWindowSizeStore, WindowSizeStore } from '../zustand/stores'

type DisplayState = {
  isLeft: boolean
  isRight: boolean
}

const windowStateSelector = (state: WindowSizeStore) => state.width

export const useOverflow = () => {
  const [{ isLeft, isRight }, setDisplay] = useState<DisplayState>({
    isLeft: false,
    isRight: false,
  })
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const windowWidth = useWindowSizeStore(windowStateSelector)

  useLayoutEffect(() => {
    setDisplay(prev => {
      if (!wrapperRef.current || !wrapperRef.current.parentElement) return prev

      const rect = wrapperRef.current.getBoundingClientRect()
      const parentRect =
        wrapperRef.current.parentElement.getBoundingClientRect()
      const { offsetLeft } = wrapperRef.current

      const isRight =
        (offsetLeft > 0 && rect.right < windowWidth * 0.9) ||
        (offsetLeft < 0 && parentRect.right - offsetLeft < windowWidth * 0.9)
      const isLeft =
        !isRight &&
        ((offsetLeft > 0 && parentRect.left > rect.right - parentRect.right) ||
          (offsetLeft < 0 && rect.left > 0))

      return { isLeft, isRight }
    })
  }, [windowWidth])

  return {
    isLeft,
    isRight,
    wrapperRef,
  }
}
