import range from 'lodash/range'
import { v4 } from 'uuid'
import { currentYear } from '../api/queries'
import {
  MediaFormat,
  MediaSearchQueryVariables,
  MediaSeason,
  MediaSource,
  MediaStatus,
  MediaType,
} from '../generated/index'
import { formatLabel } from '../utils/formatLabel'
import { tags } from './tags'

export const filterOptions = {
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
    options: Object.values(MediaSeason) as string[],
    isMulti: false,
  },

  format: {
    options: Object.values(MediaFormat) as string[],
    isMulti: true,
  },

  status: {
    options: Object.values(MediaStatus) as string[],
    isMulti: false,
  },

  country: {
    options: ['Japan', 'South Korea', 'China', 'Taiwan'],
    isMulti: false,
  },

  source: {
    options: Object.values(MediaSource) as string[],
    isMulti: false,
  },
}

export const allowedURLParams = [
  ...Object.keys(filterOptions),
  'searchText',
  'page',
  'sortBy',
]

export const filters = Object.entries(filterOptions)
  .filter(([key]) => key !== 'sortBy')
  .map(([key, value]) => ({
    key: v4(),
    name: key as keyof MediaSearchQueryVariables,
    isMulti: value.isMulti,
    options: value.options.map(o => ({
      value: o,
      label: formatLabel(o),
    })),
  }))

export type Filters = typeof filters

export const MediaTypes = {
  anime: MediaType.Anime,
  manga: MediaType.Manga,
} as const
