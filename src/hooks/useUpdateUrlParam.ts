import debounce from 'lodash/debounce'
import uniq from 'lodash/uniq'
import { useCallback, useEffect, useMemo, useState } from 'react'
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

  const updateUrl = useMemo(
    () =>
      debounce(
        (queryVars: SearchResultQueryVariables) =>
          history.push(
            `${location.pathname}?${nextParam(initialParams, {
              ...queryVars,
              page: 1,
            })}`
          ),
        250
      ),
    [history, initialParams, location.pathname]
  )

  const updateFilter = useMemo(
    () =>
      debounce((queryVars: SearchResultQueryVariables) => {
        setParams(prev => nextParam(prev, queryVars || {}))
      }, 250),
    []
  )

  const applyFilter = useCallback(
    () => history.push(`${location.pathname}?${params}`),
    [history, params, location.pathname]
  )

  const movePage = useCallback(
    (page: number) =>
      !isFetching &&
      history.push(
        `${location.pathname}?${nextParam(initialParams, { page })}`
      ),
    [history, isFetching, initialParams, location.pathname]
  )

  const resetParams = useCallback(() => {
    history.push(location.pathname)
  }, [location.pathname, history])

  return {
    updateUrl,
    updateFilter,
    applyFilter,
    movePage,
    resetParams,
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
