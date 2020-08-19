import { currentYear } from '../graphql/queries'
import _ from 'lodash'

import { tags } from './tags'
import { toStartCase } from '../helper'

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
    options: _.range(1970, currentYear + 1)
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
}

const SORT_BY = [
  'TRENDING_DESC',
  'POPULARITY_DESC',
  'SCORE_DESC',
  'TITLE_ROMAJI',
  'FAVOURITES_DESC',
  'START_DATE_DESC',
] as const

export const sortByOptions = SORT_BY.map(s => ({
  value: s,
  label:
    s.split('_')?.slice(0, -1).length > 0
      ? toStartCase(s.split('_')?.slice(0, -1)?.join())
      : toStartCase(s),
}))

export type SortBy = typeof SORT_BY[number]
