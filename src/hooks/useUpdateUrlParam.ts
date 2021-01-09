import { useHistory } from 'react-router-dom'
import { QueryVar } from '../api/queries'

type Value = string | string[]

const setParam = ({
  params,
  value,
  key,
}: {
  params: URLSearchParams
  value: Value
  key: string
}) => {
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

  return (
    params: URLSearchParams,
    obj: { value: Value; key: string } | QueryVar
  ) => {
    if ('key' in obj && 'value' in obj) {
      setParam({ value: obj.value, key: obj.key, params })
    } else {
      Object.entries(obj).forEach(
        ([key, value]) =>
          value && setParam({ value: String(value), key, params })
      )
    }
    history.push(`/search${params ? `/?${params}` : ''}`)
  }
}
