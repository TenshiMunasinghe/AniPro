import debounce from 'lodash/debounce'
import { useEffect, useMemo, useState } from 'react'
import { useIsFetching } from 'react-query'
import { useHistory, useLocation } from 'react-router-dom'
import { QueryVar } from '../api/types'
import { SEARCH_QUERY_KEY } from './useFetchSearchResult'

type setParamArg = {
  params: URLSearchParams
  value: string | number | string[]
  key: string
}

const addParam = ({ params, value, key }: setParamArg) => {
  String(value).length !== 0
    ? params.set(key, String(value))
    : params.delete(key)
}

const nextParam = (paramStr: string, queryVars: Partial<QueryVar>) => {
  const params = new URLSearchParams(paramStr)

  Object.entries(queryVars).forEach(
    ([key, value]) =>
      value !== null &&
      value !== undefined &&
      addParam({
        value,
        key,
        params,
      })
  )

  return params.toString()
}

export const useUpdateUrlParam = () => {
  const history = useHistory()
  const location = useLocation()
  const isFetching = useIsFetching([SEARCH_QUERY_KEY]) > 0

  const initialParams = useMemo(
    () => new URLSearchParams(location.search).toString(),
    [location.search]
  )

  const [params, setParams] = useState(initialParams)

  useEffect(() => {
    setParams(initialParams)
  }, [initialParams])

  const updateUrl = debounce(
    (queryVars: Partial<QueryVar>) =>
      history.push(
        `/search?${nextParam(initialParams, {
          ...queryVars,
          page: 1,
        })}`
      ),
    250
  )

  const updateFilter = debounce((queryVars: Partial<QueryVar>) => {
    setParams(prev => nextParam(prev, queryVars))
  }, 250)

  const applyFilter = () => history.push(`/search?${params}`)

  const movePage = (page: number) =>
    !isFetching && history.push(`/search?${nextParam(initialParams, { page })}`)

  return {
    updateUrl,
    updateFilter,
    applyFilter,
    movePage,
    params: new URLSearchParams(params),
    initialParams: new URLSearchParams(initialParams),
  }
}
