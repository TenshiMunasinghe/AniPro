import { useCallback, useState } from 'react'
import { MediaSort } from '../generated'

export const useSortMedia = (defaultSort?: MediaSort) => {
  const [sortBy, setSortBy] = useState<MediaSort>(
    defaultSort || MediaSort.PopularityDesc
  )

  const sortByOnChange = useCallback((value: string | string[]) => {
    if (typeof value !== 'string') return
    setSortBy(value as MediaSort)
  }, [])

  return { sortBy, sortByOnChange }
}
