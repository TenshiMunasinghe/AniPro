import { useLayoutEffect, useMemo } from 'react'
import debounce from 'lodash/debounce'

import { useWindowSizeStore, WindowSizeStore } from '../zustand/stores'

const selector = (state: WindowSizeStore) => state.set

export const useWindowResize = () => {
  const setSize = useWindowSizeStore(selector)

  const updateSize = useMemo(
    () =>
      debounce(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight })
      }, 250),
    [setSize]
  )

  useLayoutEffect(() => {
    window.addEventListener('resize', updateSize)
    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [updateSize])
}
