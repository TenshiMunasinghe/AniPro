export type NextParamArgs = {
  isMulti: boolean
  selected: string | string[]
  key: string
  value: string
}

export const nextParam = ({ isMulti, selected, key, value }: NextParamArgs) => {
  if (!isMulti) {
    return { [key]: value === selected ? '' : value }
  }
  const next = [...(selected as string[])]
  if (next.includes(value)) {
    const i = next.indexOf(value)
    next.splice(i, 1)
  } else {
    next.push(value)
  }
  return { [key]: next }
}
