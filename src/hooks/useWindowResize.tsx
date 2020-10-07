import { useLayoutEffect, useCallback, useRef, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import debounce from 'lodash/debounce'

import { windowSizeAtom } from '../recoil/atoms'

export const useWindowResize = () => {
  const [_size, setSize] = useRecoilState(windowSizeAtom)
  const size = useRef(_size)

  const updateSize = useCallback(
    debounce(() => {
      console.log('called')

      setSize({ width: window.innerWidth, height: window.innerHeight })
    }, 250),
    [setSize]
  )

  useEffect(() => {
    size.current = _size
  }, [_size])

  useLayoutEffect(() => {
    window.addEventListener('resize', updateSize)
    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [updateSize])
}
