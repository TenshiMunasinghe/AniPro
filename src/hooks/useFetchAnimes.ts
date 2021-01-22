import { useState, useEffect, useRef, useCallback } from 'react'
import produce from 'immer'
import uniqBy from 'lodash/uniqBy'

import { QueryData, QueryVar, ky, GET_SEARCH_RESULT } from '../api/queries'

type FetchDataParam = { queryVariables: QueryVar; paginate: boolean }

export const useFetchAnimes = () => {
  const [data, setData] = useState<QueryData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const mountedRef = useRef(true)

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  const fetchData = useCallback(
    async ({ queryVariables, paginate }: FetchDataParam) => {
      const page =
        paginate && data?.Page.pageInfo.currentPage
          ? data?.Page.pageInfo.currentPage + 1
          : 1
      if (!paginate) {
        setData(null)
      }
      try {
        setLoading(true)

        const res: { data: QueryData } = await ky
          .post('', {
            json: {
              query: GET_SEARCH_RESULT,
              variables: { ...queryVariables, perPage: 20, page },
            },
          })
          .json()

        if (!res || !mountedRef.current) {
          return
        }

        setData(prev => {
          if (paginate && prev) {
            return produce(prev, next => {
              next.Page.pageInfo = { ...res.data.Page.pageInfo }
              next.Page.media = uniqBy(
                [...next.Page.media, ...res.data.Page.media],
                'id'
              )
            })
          } else {
            return res.data
          }
        })
      } catch (e) {
        setError(e)
        console.error(e)
      }
      setLoading(false)
    },
    [data?.Page.pageInfo.currentPage]
  )

  return { data, loading, error, fetchData }
}
