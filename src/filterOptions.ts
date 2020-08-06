import { currentYear } from './graphql/queries'
import _ from 'lodash'

export const filterOptions = {
  genres: {
    options: [
      'Action',
      'Adventure',
      'Comedy',
      'Drama',
      'Ecchi',
      'Fantasy',
      'Hentai',
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

  year: {
    options: _.range(1970, currentYear + 1).map(y => y.toString()),
    isMulti: false,
  },

  season: {
    options: ['WINTER', 'SPRING', 'SUMMER', 'FALL'],
    isMulti: false,
  },

  format: {
    options: [
      'TV',
      'TV_SHORT',
      'MOVIE',
      'SPECIAL',
      'OVA',
      'ONA',
      'MUSIC',
      'MANGA',
      'NOVEL',
      'ONE_SHOT',
    ],
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

export type SortBy =
  | 'TRENDING_DESC'
  | 'POPULARITY_DESC'
  | 'SCORE_DESC'
  | 'TITLE_ROMAJI'
  | 'FAVOURITES_DESC'
  | 'EPISODES'
  | 'EPISODES_DESC'
  | 'START_DATE'
  | 'START_DATE_DESC'
