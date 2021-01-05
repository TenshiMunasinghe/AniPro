import { useRef, useCallback, useEffect, DependencyList } from 'react'

export const useSkip = (fn: () => void, deps: DependencyList, skip = 1) => {
  const count = useRef(1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback = useCallback(fn, deps)
  useEffect(() => {
    if (count.current <= skip) {
      count.current++
      return
    } else {
      callback()
    }
  }, [callback, skip])
}
