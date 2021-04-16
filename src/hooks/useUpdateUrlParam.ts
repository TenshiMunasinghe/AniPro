import { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { QueryVar } from '../api/types'

type setParamArg = {
  params: URLSearchParams
  value: string | string[]
  key: string
}

const addParam = ({ params, value, key }: setParamArg) => {
  if (value.length === 0) {
    params.delete(key)
    return
  }
  if (Array.isArray(value)) {
    params.delete(key)
    value.forEach(v => {
      params.append(key, v)
    })
  } else {
    params.set(key, value)
  }
}

export const useUpdateUrlParam = () => {
  const history = useHistory()
  const location = useLocation()
  const initialParams = useMemo(() => new URLSearchParams(location.search), [
    location.search,
  ])

  const [params, setParams] = useState({
    query: initialParams.toString(),
    willApply: false,
  })

  useEffect(() => {
    setParams({
      query: initialParams.toString() || 'page=1&sortBy=TRENDING_DESC',
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
      setParams(prev => {
        const params = new URLSearchParams(prev.query)

        Object.entries(queryVars).forEach(
          ([key, value]) =>
            value !== null &&
            value !== undefined &&
            addParam({ value: String(value), key, params })
        )

        if (!Object.keys(queryVars).includes('page') && willApply)
          params.set('page', '1')

        return { query: params.toString(), willApply }
      })
    },
    []
  )

  const applyFilter = useCallback(() => {
    setParams(prev => {
      const params = new URLSearchParams(prev.query)
      params.set('page', '1')
      return { query: params.toString(), willApply: true }
    })
  }, [])

  return {
    addFilterOptions,
    applyFilter,
    params: new URLSearchParams(params.query),
    initialParams: initialParams,
  }
}
