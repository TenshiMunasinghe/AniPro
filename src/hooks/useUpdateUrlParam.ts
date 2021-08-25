import debounce from 'lodash/debounce'
import uniq from 'lodash/uniq'
import { useEffect, useMemo, useState } from 'react'
import { useIsFetching } from 'react-query'
import { useHistory, useLocation } from 'react-router-dom'
import { allowedURLParams } from '../filterOptions/filterOptions'
import { SearchResultQueryVariables } from '../generated/index'

type setParamArg = {
  params: URLSearchParams
  value: string | number | string[]
  key: string
}

const paramToObj = (params: URLSearchParams) =>
  Object.fromEntries(
    uniq(
      Array.from(params.keys()).filter(key => allowedURLParams.includes(key))
    ).map(key => {
      const value = params.get(key)
      return [key, value?.includes(',') ? value.split(',') : value]
    })
  ) as SearchResultQueryVariables

const addParam = ({ params, value, key }: setParamArg) => {
  String(value).length !== 0
    ? params.set(key, String(value))
    : params.delete(key)
}

const nextParam = (
  paramStr: string,
  queryVars: Partial<SearchResultQueryVariables>
) => {
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
  const isFetching = useIsFetching(['search']) > 0

  const initialParams = useMemo(
    () => new URLSearchParams(location.search).toString(),
    [location.search]
  )

  const [params, setParams] = useState(initialParams)

  useEffect(() => {
    setParams(initialParams)
  }, [initialParams])

  const updateUrl = debounce(
    (queryVars: SearchResultQueryVariables) =>
      history.push(
        `/search?${nextParam(initialParams, {
          ...queryVars,
          page: 1,
        })}`
      ),
    250
  )

  const updateFilter = debounce((queryVars: SearchResultQueryVariables) => {
    setParams(prev => nextParam(prev, queryVars || {}))
  }, 250)

  const applyFilter = () => history.push(`/search?${params}`)

  const movePage = (page: number) =>
    !isFetching && history.push(`/search?${nextParam(initialParams, { page })}`)

  return {
    updateUrl,
    updateFilter,
    applyFilter,
    movePage,
    queryVars: {
      current: paramToObj(new URLSearchParams(params)),
      initial: paramToObj(new URLSearchParams(initialParams)),
    },
    params: {
      current: new URLSearchParams(params),
      initial: new URLSearchParams(initialParams),
    },
  }
}
