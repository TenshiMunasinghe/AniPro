import { useEffect, useState } from 'react'
import { useSkip } from './useSkip'

export const useInfiniteScroll = (callback: () => void) => {
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop <
          document.documentElement.offsetHeight - 100 ||
        isFetching
      )
        return
      setIsFetching(true)
    }

    document.addEventListener('scroll', handleScroll)

    return () => document.removeEventListener('scroll', handleScroll)
  }, [setIsFetching, isFetching])

  useSkip(() => {
    if (!isFetching) {
      return
    }
    callback()
    setIsFetching(false)
  }, [isFetching, callback])
}
