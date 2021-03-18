import { timeToArr } from './timeToArr'

export const timeToStr = (
  timeArr: ReturnType<typeof timeToArr>,
  precision = timeArr.length
) => {
  return timeArr
    .slice(0, precision > timeArr.length ? timeArr.length : precision)
    .map(val => (val ? `${val.num} ${val.unit}` : ''))
    .filter(str => str !== '')
    .join(' ')
}
