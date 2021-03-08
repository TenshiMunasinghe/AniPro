import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { QueryVar } from '../api/types';

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

const setParam = ({ params, value, key }: setParamArg) => {
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

  return useCallback(
    (params: URLSearchParams, obj: KeyValue | Partial<QueryVar>) => {
      if ('key' in obj && 'value' in obj) {
        setParam({ value: obj.value, key: obj.key, params })
      } else {
        Object.entries(obj).forEach(
          ([key, value]) =>
            value && setParam({ value: String(value), key, params })
        )
      }
      history.push(`/search${params ? `/?${params}` : ''}`)
    },
    [history]
  )
}
