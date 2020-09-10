import _ from 'lodash'

export const convertFromSeconds = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(seconds / 3600)
  const days = Math.floor(seconds / (3600 * 24))

  if (days !== 0) {
    return `${days} days`
  } else if (hours !== 0) {
    return `${hours} hours`
  } else if (minutes !== 0) {
    return `${minutes} minutes`
  } else {
    return `${seconds} seconds`
  }
}

export const toStartCase = (str: string) => _.startCase(_.lowerCase(str))

export const trimText = (text: string, limit: number) => {
  if (!text) return ''
  return text.length > limit ? text.substring(0, limit - 3) + '...' : text
}
