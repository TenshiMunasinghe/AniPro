import startCase from 'lodash/startCase'
import lowerCase from 'lodash/lowerCase'

const pluralize = (num: number, str: string) => {
  return num === 1 ? `${num} ${str}` : `${num} ${str}s`
}

export const convertFromSeconds = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(seconds / 3600)
  const days = Math.floor(seconds / (3600 * 24))

  if (days !== 0) {
    return pluralize(days, 'day')
  } else if (hours !== 0) {
    return pluralize(hours, 'hour')
  } else if (minutes !== 0) {
    return pluralize(minutes, 'minute')
  } else {
    return pluralize(seconds, 'second')
  }
}

export const toStartCase = (str: string) => startCase(lowerCase(str))
