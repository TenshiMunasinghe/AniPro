import uniqBy from 'lodash/uniqBy'
import { useRef } from 'react'
import uniq from 'lodash/uniq'
import { useQuery } from 'react-query'

import { GET_SEARCH_RESULT, ky } from '../api/queries'
import { PageInfo, QueryData } from '../api/types'
import { allowedURLParams } from '../filterOptions/filterOptions'

export const DEFAULT_PER_PAGE = 20

export const SEARCH_QUERY_KEY = 'search'

const paramToObj = (params: URLSearchParams) =>
  Object.fromEntries(
    uniq(
      Array.from(params.keys()).filter(key => allowedURLParams.includes(key))
    ).map(key => {
      const value = params.get(key)
      return [key, value?.includes(',') ? value.split(',') : value]
    })
  )

export const useFetchSearchResult = (params: URLSearchParams) => {
  const { data, isLoading, error, isSuccess, isError } = useQuery<QueryData>({
    queryKey: [SEARCH_QUERY_KEY, params.toString()],
    queryFn: async () => {
      const queryVariables = paramToObj(params)
      const { data } = await ky
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

      return data as QueryData
    },
    onSuccess: data => {
      pageInfo.current = { ...data.Page.pageInfo }
    },
  })

  const pageInfo = useRef<PageInfo>({
    currentPage: 1,
    hasNextPage: false,
    lastPage: 1,
  })

  return {
    medias: uniqBy(data?.Page.media, 'id'),
    isLoading,
    error,
    pageInfo: pageInfo.current,
    isSuccess,
    isError,
  }
}
