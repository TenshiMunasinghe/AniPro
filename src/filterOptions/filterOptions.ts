import { currentYear } from '../api/queries'
import range from 'lodash/range'

import { tags } from './tags'
import { toStartCase } from '../utils/toStartCase'

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
      options: ['WINTER', 'SPRING', 'SUMMER', 'FALL'],
      isMulti: false,
    },

    format: {
      options: ['TV', 'TV_SHORT', 'MOVIE', 'SPECIAL', 'OVA', 'ONA', 'MUSIC'],
      isMulti: true,
    },

    status: {
      options: ['FINISHED', 'RELEASING', 'NOT_YET_RELEASED', 'CANCELLED'],
      isMulti: false,
    },

    country: {
      options: ['Japan', 'South Korea', 'China', 'Taiwan'],
      isMulti: false,
    },

    source: {
      options: [
        'ORIGINAL',
        'MANGA',
        'LIGHT_NOVEL',
        'VISUAL_NOVEL',
        'VIDEO_GAME',
        'OTHER',
        'NOVEL',
        'DOUJINSHI',
        'ANIME',
      ],
      isMulti: false,
    },
  },
  simple: {
    sortBy: {
      options: [
        'TRENDING_DESC',
        'POPULARITY_DESC',
        'SCORE_DESC',
        'FAVOURITES_DESC',
        'START_DATE_DESC',
      ],
      isMulti: false,
    },
  },
}

export const filterOptions = {
  ...filterOptionTypes.default,
  ...filterOptionTypes.simple,
}

export type FilterOptionKeys = keyof typeof filterOptions

export const sortByOptions = filterOptions.sortBy.options.map(s => ({
  value: s,
  label:
    s.split('_')?.slice(0, -1).length > 0
      ? toStartCase(s.split('_')?.slice(0, -1)?.join())
      : toStartCase(s),
}))

export type SortBy = typeof filterOptions.sortBy.options[number]
