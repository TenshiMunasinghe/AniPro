import { TimeUnits } from './type'

export const convertTime: (obj: {
  num: number
  input: TimeUnits
  output: TimeUnits[]
}) => { [key in TimeUnits]?: number } = ({ num, input, output }) => {
  const r = {} as any
  const s = {
    years: 31536000,
    months: 2592000,
    weeks: 604800,
    days: 86400,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  }

  const _output = output.sort((a, b) => s[b] - s[a])

  let d = num * s[input]

  Object.keys(s)
    .filter(key => _output.includes(key as TimeUnits))
    .forEach(k => {
      const key = k as keyof typeof s
      r[key] = Math.floor(d / s[key])
      d -= r[key] * s[key]
    })

  return r
}
