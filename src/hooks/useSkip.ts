import { useRef, useEffect, useCallback, DependencyList } from 'react'

export default (fn: () => void, deps: DependencyList, skip = 1) => {
  const count = useRef(1)
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
