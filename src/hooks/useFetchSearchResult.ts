import uniqBy from 'lodash/uniqBy'
import { useCallback, useEffect, useRef, useState } from 'react'

import { GET_SEARCH_RESULT, ky } from '../api/queries'
import { NextPageInfo, QueryData, QueryVar, SearchResult } from '../api/types'

type FetchAnimesParam = { queryVariables: Partial<QueryVar> }
interface FetchDataParam extends FetchAnimesParam {
  paginate: boolean
}

export const useFetchSearchResult = ({ queryVariables }: FetchAnimesParam) => {
  const [medias, setMedias] = useState<SearchResult[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const nextPageInfo = useRef<NextPageInfo>({
    currentPage: 1,
    hasNextPage: false,
  })

  const isMounted = useRef(false)

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
                perPage: queryVariables.perPage || 20,
                page,
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
          if (paginate && prev) {
            return uniqBy([...prev, ...Page.media], 'id')
          } else {
            return res.data.Page.media
          }
        })
        nextPageInfo.current = { ...Page.pageInfo }
      } catch (e) {
        if (isMounted.current) {
          setError(e)
        }
        console.error(e)
      }
      setLoading(false)
    },
    []
  )

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    fetchData({ queryVariables, paginate: false })
  }, [queryVariables, fetchData])

  return {
    medias,
    loading,
    error,
    fetchData,
    nextPageInfo: nextPageInfo.current,
  }
}
