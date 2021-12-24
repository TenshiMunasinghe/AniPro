import { useCallback, useState } from 'react'
import { MediaSort } from '../generated'

type SortParameter = MediaSort | MediaSort[]

export const useSortMedia = (defaultSort?: SortParameter) => {
  const [sortBy, setSortBy] = useState<SortParameter>(
    defaultSort || MediaSort.PopularityDesc
  )

  const sortByOnChange = useCallback((value: string | string[]) => {
    setSortBy(value as SortParameter)
  }, [])

  return { sortBy, sortByOnChange }
}
