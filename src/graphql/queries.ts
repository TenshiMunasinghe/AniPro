import _ky from 'ky'

import { SortBy } from '../filterOptions'

const date = new Date()

const SEASONS = [
  { name: 'SPRING', months: [3, 4, 5] },
  { name: 'SUMMER', months: [6, 7, 8] },
  { name: 'FALL', months: [9, 10, 11] },
  { name: 'WINTER', months: [12, 1, 2] },
]
const month = date.getMonth()
const current = SEASONS.find(({ months }) => months.includes(month))
const next = SEASONS.find(({ months }) => months.includes(month + 3))

export const currentSeason = current ? current.name : ''

export const nextSeason = next ? next.name : ''

export const currentYear = date.getFullYear()

export type QueryData = {
  Page: {
    pageInfo: {
      currentPage: number
      hasNextPage: boolean
    }
    media: {
      id: number
      title: {
        english: string
        romaji: string
      }
      coverImage: {
        extraLarge: string
        large: string
        color: string
      }
      status: 'FINISHED' | 'RELEASING' | 'NOT_YET_RELEASED' | 'CANCELLED'
      genres: string[]
      meanScore: number
      description: string
      format: string
      season: string | null
      seasonYear: number | null
      episodes: number | null
      duration: number
      popularity: number
      studios: {
        nodes: { name: string }[] | undefined[]
      }
      nextAiringEpisode: {
        timeUntilAiring: number
        episode: number
      } | null
    }[]
  }
}

export type SearchResult = QueryData['Page']['media'][number]

export type GenreType = { genre: string; key: string }[]

export type QueryVar = {
  page?: number
  genres?: string[]
  year?: number
  season?: string
  format?: string
  status?: string
  country?: string
  source?: string
  searchText: string | null
  sortBy?: SortBy
  perPage: number
}

export const ky = _ky.create({ prefixUrl: 'https://graphql.anilist.co' })

// const connection =
//   navigator.connection ||
//   navigator.mozConnection ||
//   navigator.webkitConnection ||
//   null

export const imageSize = 'extraLarge'

export const GET_SEARCH_RESULT = `
query getSearchResult($page: Int, $genres: [String], $tags: [String], $year: Int, $season: MediaSeason, $format: [MediaFormat], $status: MediaStatus, $country: CountryCode, $source: MediaSource, $searchText: String, $sortBy: [MediaSort], $perPage: Int!) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      currentPage
      hasNextPage
    }
    media(genre_in: $genres, genre_not_in: ["Hentai"], tag_in: $tags, seasonYear: $year, season: $season, format_in: $format, status: $status, countryOfOrigin: $country, source: $source, search: $searchText, sort: $sortBy, format_not_in: [MANGA, NOVEL, ONE_SHOT, MUSIC]) {
      id
      title {
        romaji
        english
      }
      coverImage {
        large
        extraLarge
        color
      }
      status
      genres
      description
      meanScore
      format
      season
      seasonYear
      episodes
      duration
      popularity
      studios(isMain: true) {
        nodes{
          name
        }
      }
      nextAiringEpisode {
        timeUntilAiring
        episode
      }
    }
  }
}
`
