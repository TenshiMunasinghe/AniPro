import { useCallback, useEffect, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import { isChildOverflow } from '../utils/isChildOverflow'

export const useFitContent = <T>(initilState: T[]) => {
  const [state, setState] = useState(initilState)
  const onResize = useCallback(() => {
    setState([...initilState])
  }, [initilState])
  const { ref } = useResizeDetector({
    onResize: onResize,
    refreshMode: 'debounce',
    refreshRate: 250,
    skipOnMount: true,
  })

  useEffect(() => {
    if (!ref.current) return

    if (isChildOverflow(ref.current as HTMLElement).overflow.either) {
      setState(state.slice(0, -1))
    }
  }, [state, ref])

  return { ref, state, setState }
}
