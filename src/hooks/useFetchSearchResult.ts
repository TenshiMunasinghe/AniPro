import uniqBy from 'lodash/uniqBy'
import { useCallback, useEffect, useRef, useState } from 'react'
import { URLSearchParams } from 'url'
import uniq from 'lodash/uniq'

import { GET_SEARCH_RESULT, ky } from '../api/queries'
import { PageInfo, QueryData, SearchResult } from '../api/types'
import { allowedURLParams } from '../filterOptions/filterOptions'
import { LoadingStore, useLoadingStore } from '../zustand/stores'

export const DEFAULT_PER_PAGE = 20

const loadingSelector = (state: LoadingStore) => state.setLoadingSearchResult

export const useFetchSearchResult = (params: URLSearchParams) => {
  const setLoadingSearchResult = useLoadingStore(loadingSelector)

  const [medias, setMedias] = useState<SearchResult[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const pageInfo = useRef<PageInfo>({
    currentPage: 1,
    hasNextPage: false,
    lastPage: 1,
  })

  const isMounted = useRef(false)

  const fetchData = useCallback(async (params: URLSearchParams) => {
    try {
      const queryVariables = Object.fromEntries(
        uniq(
          Array.from(params.keys()).filter(key =>
            allowedURLParams.includes(key)
          )
        ).map(key => {
          const value = params.get(key)
          return [key, value?.includes(',') ? value.split(',') : value]
        })
      )

      setLoading(true)
      setMedias(null)

      const res: { data: QueryData } = await ky
        .post('', {
          json: {
            query: GET_SEARCH_RESULT,
            variables: {
              ...queryVariables,
              sortBy: queryVariables.sortBy || 'TRENDING_DESC',
              perPage: queryVariables.perPage || DEFAULT_PER_PAGE,
            },
          },
        })
        .json()

      if (!res || !isMounted.current) {
        return
      }

      const {
        data: { Page },
      } = res

      setMedias(prev => {
        if (prev) {
          return uniqBy([...prev, ...Page.media], 'id')
        } else {
          return res.data.Page.media
        }
      })
      pageInfo.current = { ...Page.pageInfo }
    } catch (e) {
      if (isMounted.current) {
        setError(e)
      }
      console.error(e)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    fetchData(params)
  }, [params, fetchData])

  useEffect(() => {
    setLoadingSearchResult(isMounted.current ? loading : false)
  }, [loading, setLoadingSearchResult])

  return {
    medias,
    loading,
    error,
    fetchData,
    pageInfo: pageInfo.current,
  }
}
