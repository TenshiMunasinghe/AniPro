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

export const currentSeason = current ? current.name : ''

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
        romaji: string
        native: string
      }
      coverImage: {
        [key: string]: string
      }
      status: string
      genres: string[]
      description: string
      nextAiringEpisode: {
        timeUntilAiring: number
        episode: number
      } | null
    }[]
  }
}

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
  sortBy: SortBy
}

export const baseUrl = 'https://graphql.anilist.co'

export const imageSize = 'extraLarge'

export const getsearchResult = `
query animeQuery($page: Int, $genres: [String], $tags: [String], $year: Int, $season: MediaSeason, $format: [MediaFormat], $status: MediaStatus, $country: CountryCode, $source: MediaSource, $searchText: String, $sortBy: [MediaSort]) {
  Page(page: $page, perPage: 10) {
    pageInfo {
      currentPage
      hasNextPage
    }
    media(genre_in: $genres, genre_not_in: ["Hentai"], tag_in: $tags, seasonYear: $year, season: $season, format_in: $format, status: $status, countryOfOrigin: $country, source: $source, search: $searchText, sort: $sortBy, format_not_in: [MANGA, NOVEL, ONE_SHOT]) {
      id
      title {
        romaji
        native
      }
      coverImage {
        ${imageSize}
      }
      status
      genres
      description
      nextAiringEpisode {
        timeUntilAiring
        episode
      }
    }
  }
}
`
