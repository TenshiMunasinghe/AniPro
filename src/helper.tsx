import startCase from 'lodash/startCase'
import lowerCase from 'lodash/lowerCase'

import { SearchResult } from './graphql/queries'

export const pluralize = (num: number, str: string) => {
  return num === 1 ? `${num} ${str}` : `${num} ${str}s`
}

type TimeUnits =
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'weeks'
  | 'months'
  | 'years'

export const convertTime = ({
  num,
  input,
  output,
}: {
  num: number
  input: TimeUnits
  output: TimeUnits[]
}) => {
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

export const convertFromMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(minutes / (60 * 24))

  if (days !== 0) {
    return pluralize(days, 'day')
  } else if (hours !== 0) {
    return pluralize(hours, 'hour')
  } else if (minutes !== 0) {
    return pluralize(minutes, 'minute')
  }
}

const hexToHsl = (H: string) => {
  // Convert hex to RGB first
  let r: any = 0,
    g: any = 0,
    b: any = 0
  if (H.length === 4) {
    r = '0x' + H[1] + H[1]
    g = '0x' + H[2] + H[2]
    b = '0x' + H[3] + H[3]
  } else if (H.length === 7) {
    r = '0x' + H[1] + H[2]
    g = '0x' + H[3] + H[4]
    b = '0x' + H[5] + H[6]
  }
  // Then to HSL
  r /= 255
  g /= 255
  b /= 255
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0

  if (delta === 0) h = 0
  else if (cmax === r) h = ((g - b) / delta) % 6
  else if (cmax === g) h = (b - r) / delta + 2
  else h = (r - g) / delta + 4

  h = Math.round(h * 60)

  if (h < 0) h += 360

  l = (cmax + cmin) / 2
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
  s = +(s * 100).toFixed(1)
  l = +(l * 100).toFixed(1)

  return { h, s, l }
}

export const adjustColor = (hex: string | null, lightness: number) => {
  if (hex === null) return 'inherit'

  const hsl = hexToHsl(hex)
  return `hsl(${hsl.h}, ${hsl.s}%, ${lightness}%)`
}

export const toStartCase = (str: string) => startCase(lowerCase(str))

export const airingInfo = ({
  nextAiringEpisode,
  season,
  seasonYear,
}: {
  nextAiringEpisode: SearchResult['nextAiringEpisode']
  season: SearchResult['season']
  seasonYear: SearchResult['seasonYear']
}) => {
  if (!nextAiringEpisode && season && seasonYear) {
    return `${toStartCase(season)} ${seasonYear}`
  } else if (nextAiringEpisode) {
    const timeUntilAiring = Object.entries<number>(
      convertTime({
        num: nextAiringEpisode.timeUntilAiring,
        input: 'seconds',
        output: ['weeks', 'days', 'hours', 'minutes'],
      })
    )
      .filter(([_, val]) => val !== 0)
      .shift()

    return timeUntilAiring
      ? `Episode ${nextAiringEpisode.episode} airing in ${pluralize(
          timeUntilAiring[1],
          timeUntilAiring[0].slice(0, -1)
        )}`
      : ''
  }

  return ''
}
