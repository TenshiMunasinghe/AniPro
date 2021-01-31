import { useState, useEffect, useRef, useCallback } from 'react'
import uniqBy from 'lodash/uniqBy'
import { NextPageInfo } from '../api/queries'

import {
  QueryData,
  QueryVar,
  ky,
  GET_SEARCH_RESULT,
  SearchResult,
} from '../api/queries'

type FetchDataParam = { queryVariables: Partial<QueryVar>; paginate: boolean }

export const useFetchAnimes = () => {
  const [medias, setMedias] = useState<SearchResult[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const nextPageInfo = useRef<NextPageInfo>({
    currentPage: 1,
    hasNextPage: false,
  })
  const mountedRef = useRef(true)

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  const fetchData = useCallback(
    async ({ queryVariables, paginate }: FetchDataParam) => {
      const page = paginate ? nextPageInfo.current.currentPage + 1 : 1
      try {
        if (!paginate) setMedias(null)

        setLoading(true)

        const res: { data: QueryData } = await ky
          .post('', {
            json: {
              query: GET_SEARCH_RESULT,
              variables: {
                ...queryVariables,
                perPage: queryVariables.perPage ? queryVariables.perPage : 20,
                page,
              },
            },
          })
          .json()

        if (!res || !mountedRef.current) {
          return
        }

        const {
          data: { Page },
        } = res

        setMedias(prev => {
          if (paginate && prev) {
            return uniqBy([...prev, ...Page.media], 'id')
          } else {
            return res.data.Page.media
          }
        })
        nextPageInfo.current = { ...Page.pageInfo }
      } catch (e) {
        if (mountedRef.current) {
          setError(e)
        }
        console.error(e)
      }
      setLoading(false)
    },
    []
  )

  return {
    medias,
    loading,
    error,
    fetchData,
    nextPageInfo: nextPageInfo.current,
  }
}
