import { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { QueryVar } from '../api/types'
import { LoadingStore, useLoadingStore } from '../zustand/stores'

type setParamArg = {
  params: URLSearchParams
  value: string | number | string[]
  key: string
}

const loadingSelector = (state: LoadingStore) => state.loadingSearchResult

const addParam = ({ params, value, key }: setParamArg) => {
  String(value).length !== 0
    ? params.set(key, String(value))
    : params.delete(key)
}

export const useUpdateUrlParam = () => {
  const history = useHistory()
  const location = useLocation()

  const loading = useLoadingStore(loadingSelector)

  const initialParams = useMemo(() => new URLSearchParams(location.search), [
    location.search,
  ])

  const [params, setParams] = useState({
    query: initialParams.toString(),
    willApply: false,
  })

  useEffect(() => {
    setParams({
      query: initialParams.toString(),
      willApply: false,
    })
  }, [initialParams])

  useEffect(() => {
    if (params.willApply && initialParams.toString() !== params.query) {
      history.push(`/search${params.query ? `/?${params.query}` : ''}`)
    }
  }, [params, history, initialParams])

  const addFilterOptions = useCallback(
    (queryVars: Partial<QueryVar>, willApply: boolean) => {
      if (loading) return
      setParams(prev => {
        const params = new URLSearchParams(prev.query)

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

        if (!Object.keys(queryVars).includes('page') && willApply)
          params.set('page', '1')

        return { query: params.toString(), willApply }
      })
    },
    [loading]
  )

  const applyFilter = useCallback(() => {
    if (loading) return
    setParams(prev => {
      const params = new URLSearchParams(prev.query)
      params.set('page', '1')
      return { query: params.toString(), willApply: true }
    })
  }, [loading])

  return {
    addFilterOptions,
    applyFilter,
    params: new URLSearchParams(params.query),
    initialParams: initialParams,
  }
}
