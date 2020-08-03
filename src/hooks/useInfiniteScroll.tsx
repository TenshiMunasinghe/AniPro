import { useEffect, useState } from 'react'
import useSkip from './useSkip'

const useInfiniteScroll = (callback: () => void) => {
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
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

export default useInfiniteScroll
