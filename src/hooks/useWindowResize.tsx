import { useLayoutEffect, useState } from 'react'
import { debounce } from 'lodash'

const useWindowResize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    const updateSize = debounce(() => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }, 250)

    window.addEventListener('resize', updateSize)
    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return size
}

export default useWindowResize
