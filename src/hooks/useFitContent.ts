import { useCallback, useEffect, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import { isChildOverflow } from '../utils/isChildOverflow'

export const useFitContent = <T>(initilState: T[]) => {
  const [state, setState] = useState(initilState)
  const onResize = useCallback(() => {
    setState(initilState)
  }, [initilState])
  const { width, ref } = useResizeDetector({
    onResize,
    refreshMode: 'debounce',
    refreshRate: 250,
  })

  useEffect(() => {
    if (!ref.current || !width) return
    const _state = state

    if (isChildOverflow(ref.current as HTMLElement).overflow.either) {
      setState(_state.slice(0, -1))
    }
  }, [state, ref, width])

  return { ref, state, setState }
}
