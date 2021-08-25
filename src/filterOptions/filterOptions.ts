import range from 'lodash/range'
import { currentYear } from '../api/queries'
import {
  MediaFormat,
  MediaSeason,
  MediaSort,
  MediaSource,
  MediaStatus,
} from '../generated/index'
import { toStartCase } from '../utils/toStartCase'
import { tags } from './tags'

const enumToArr = <T extends { [key: string]: string }>(enumme: T) =>
  Object.values(enumme).filter(val => isNaN(Number(val)) === false)

export const filterOptionTypes = {
  default: {
    genres: {
      options: [
        'Action',
        'Adventure',
        'Comedy',
        'Drama',
        'Ecchi',
        'Fantasy',
        'Horror',
        'Mahou Shoujo',
        'Mecha',
        'Music',
        'Mystery',
        'Psychological',
        'Romance',
        'Sci-Fi',
        'Slice of Life',
        'Sports',
        'Supernatural',
        'Thriller',
      ],
      isMulti: true,
    },

    tags: {
      options: tags.map(t => t.name),
      isMulti: true,
    },

    year: {
      options: range(1970, currentYear + 2)
        .sort((a, b) => b - a)
        .map(y => y.toString()),
      isMulti: false,
    },

    season: {
      options: enumToArr(MediaSeason),
      isMulti: false,
    },

    format: {
      options: enumToArr(MediaFormat),
      isMulti: true,
    },

    status: {
      options: enumToArr(MediaStatus),
      isMulti: false,
    },

    country: {
      options: ['Japan', 'South Korea', 'China', 'Taiwan'],
      isMulti: false,
    },

    source: {
      options: enumToArr(MediaSource),
      isMulti: false,
    },
  },
  simple: {
    sortBy: {
      options: enumToArr(MediaSort),
      isMulti: false,
    },
  },
}

export const filterOptions = {
  ...filterOptionTypes.default,
  ...filterOptionTypes.simple,
}

export const allowedURLParams = [
  ...Object.keys(filterOptions),
  'searchText',
  'page',
  'perPage',
]

export const sortByOptions = filterOptions.sortBy.options.map(s => ({
  value: s,
  label:
    s.split('_')?.slice(0, -1).length > 0
      ? toStartCase(s.split('_')?.slice(0, -1)?.join())
      : toStartCase(s),
}))

export type SortBy = typeof filterOptions.sortBy.options[number]
