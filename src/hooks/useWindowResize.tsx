import { useLayoutEffect, useCallback } from 'react'
import debounce from 'lodash/debounce'

import { useWindowSizeStore, WindowSizeStore } from '../zustand/stores'

const selector = (state: WindowSizeStore) => state.set

export const useWindowResize = () => {
  const setSize = useWindowSizeStore(selector)

  const updateSize = useCallback(
    debounce(() => {
      console.log('called')

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
