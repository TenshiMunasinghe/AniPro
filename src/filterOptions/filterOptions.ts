import range from 'lodash/range'
import { v4 } from 'uuid'
import { currentYear } from '../api/queries'
import {
  MediaFormat,
  MediaSeason,
  MediaSort,
  MediaSource,
  MediaStatus,
  SearchResultQueryVariables,
} from '../generated/index'
import { formatLabel } from '../utils/formatLabel'
import { toStartCase } from '../utils/toStartCase'
import { tags } from './tags'

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
  },
  simple: {
    sortBy: {
      options: [
        MediaSort.TrendingDesc,
        MediaSort.PopularityDesc,
        MediaSort.ScoreDesc,
        MediaSort.FavouritesDesc,
        MediaSort.StartDateDesc,
      ] as string[],
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

export const filters = Object.entries(filterOptionTypes.default)
  .filter(([key]) => key !== 'sortBy')
  .map(([key, value]) => ({
    key: v4(),
    name: key as keyof SearchResultQueryVariables,
    isMulti: value.isMulti,
    options: value.options.map(o => ({
      value: o,
      label: formatLabel(o),
    })),
  }))

export type Filters = typeof filters
