import { useCallback, useState } from 'react'
import { MediaSort } from '../generated'

export const useSortMedia = () => {
  const [sortBy, setSortBy] = useState<MediaSort | MediaSort[]>(
    MediaSort.PopularityDesc
  )

  const sortByOnChange = useCallback((value: string | string[]) => {
    setSortBy(value as MediaSort | MediaSort[])
  }, [])

  return { sortBy, sortByOnChange }
}
