import { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { QueryVar } from '../api/types'

type Value = string | string[]

type setParamArg = {
  params: URLSearchParams
  value: Value
  key: string
}

type KeyValue = {
  value: Value
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
    if (
      params.willApply &&
      new URLSearchParams(location.search).toString() !== params.query
    ) {
      history.push(`/search${params.query ? `/?${params.query}` : ''}`)
    }
  }, [params, history, location.search])

  const addFilterOptions = useCallback(
    (obj: KeyValue | Partial<QueryVar>, willApply: boolean) => {
      setParams(prev => {
        const params = new URLSearchParams(prev.query)
        if ('key' in obj && 'value' in obj) {
          addParam({ value: obj.value, key: obj.key, params })
        } else {
          Object.entries(obj).forEach(
            ([key, value]) =>
              value && addParam({ value: String(value), key, params })
          )
        }
        console.log(params.toString())

        return { query: params.toString(), willApply }
      })
    },
    []
  )

  const applyFilter = () => {
    setParams(prev => ({
      ...prev,
      willApply: true,
    }))
  }

  return {
    addFilterOptions,
    applyFilter,
    params: new URLSearchParams(params.query),
    initialParams: initialParams,
  }
}
