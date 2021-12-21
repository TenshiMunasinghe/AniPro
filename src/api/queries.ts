import _ky from 'ky'
import { MediaSeason } from '../generated/index'

const dateNow = new Date()
const dateNext = new Date(
  dateNow.getFullYear(),
  dateNow.getMonth() + 3,
  dateNow.getDate()
)

const SEASONS: {
  name: keyof typeof MediaSeason
  months: number[]
}[] = [
  { name: 'Spring', months: [4, 5, 6] },
  { name: 'Summer', months: [7, 8, 9] },
  { name: 'Fall', months: [10, 11, 12] },
  { name: 'Winter', months: [1, 2, 3] },
]
const current = SEASONS.find(({ months }) =>
  months.includes(dateNow.getMonth() + 1)
)
const next = SEASONS.find(({ months }) =>
  months.includes(dateNext.getMonth() + 1)
)

export const currentYear = dateNow.getFullYear()
export const currentSeason = current ? MediaSeason[current.name] : null
export const nextSeason = next ? MediaSeason[next.name] : null

export const nextYear = dateNext.getFullYear()

export const ky = _ky.create({ prefixUrl: 'https://graphql.anilist.co' })

// const connection =
//   navigator.connection ||
//   navigator.mozConnection ||
//   navigator.webkitConnection ||
//   null

export const imageSize = 'large'

export const NO_IMAGE_URL =
  'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/default.jpg'
