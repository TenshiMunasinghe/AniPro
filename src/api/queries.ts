import _ky from 'ky'

import { SortBy } from '../filterOptions/filterOptions'

const dateNow = new Date()
const dateNext = new Date(
  dateNow.getFullYear(),
  dateNow.getMonth() + 4,
  dateNow.getDate()
)

const SEASONS = [
  { name: 'SPRING', months: [4, 5, 6] },
  { name: 'SUMMER', months: [7, 8, 9] },
  { name: 'FALL', months: [10, 11, 12] },
  { name: 'WINTER', months: [1, 2, 3] },
]
const current = SEASONS.find(({ months }) =>
  months.includes(dateNow.getMonth() + 1)
)
const next = SEASONS.find(({ months }) => months.includes(dateNext.getMonth()))

export const currentYear = dateNow.getFullYear()
export const currentSeason = current ? current.name : ''
export const nextSeason = next ? next.name : ''

export const nextYear = dateNext.getFullYear()

export const SEARCH_TEXT = 'search'

export interface QueryVar {
  page?: number
  genres?: string[]
  year?: string
  season?: string
  format?: string
  status?: string
  country?: string
  source?: string
  searchText?: string | null
  sortBy?: SortBy
  perPage: number
}

export interface QueryData {
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
      rank?: number
    }[]
  }
}

export type NextPageInfo = QueryData['Page']['pageInfo']

export type SearchResult = QueryData['Page']['media'][number]

export interface Common {
  title: {
    romaji: string
    english: string
    native: string
  }
  coverImage: {
    extraLarge: string
  }
  bannerImage: string
  description: string
  nextAiringEpisode: {
    episode: number
    timeUntilAiring: number
  }
  format: string
  episodes: number
  duration: number
  status: string
  startDate: {
    year: number
    month: number
    date: number
  }
  season: string
  seasonYear: number
  averageScore: number
  meanScore: number
  popularity: number
  favourites: number
  studios: {
    nodes: {
      name: string
    }
  }
  source: string
  hashtag: string
  genres: string[]
  synonyms: string[]
}

export interface Watch {
  streamingEpisodes: {
    site: string
    title: string
    thumbnail: string
  }
}

export interface Characters {
  characters: {
    edges: {
      node: {
        id: number
        name: {
          full: string
        }
      }
      role: string
      voiceActors: {
        id: number
        name: {
          full: string
        }
        image: {
          large: string
        }
      }
    }
  }
}

export interface Staff {
  staff: {
    edges: {
      node: {
        id: number
        name: {
          full: string
        }
        image: {
          large: string
        }
      }
      role: string
    }
  }
}

export interface Stats {
  rankings: {
    rank: number
    context: string
    year: number | null
    season: string | null
    allTime: boolean
  }
  trends: {
    nodes: {
      date: number
      trending: number
      averageScore: number
      inProgress: number
    }
  }
  stats: {
    scoreDistribution: {
      score: number
      amount: number
    }
    statusDistribution: {
      status: number
      amount: number
    }
  }
}

export interface Overview extends Watch, Characters, Staff {
  description: string
  relations: {
    edges: {
      node: {
        id: number
        title: {
          romaji: string
        }
        coverImage: {
          extraLarge: string
        }
        format: string
        status: string
      }
      relationType: string
    }
  }
  stats: {
    scoreDistribution: {
      score: number
      amount: number
    }
    statusDistribution: {
      status: string
      amount: number
    }
  }
  trailer: {
    id: number
    site: string
    thumbnail: string
  }
  recommendations: {
    nodes: {
      mediaRecommendation: {
        id: number
        title: {
          romaji: string
        }
        coverImage: {
          extraLarge: string
        }
      }
    }
  }
}

export type AnimeDetails<T> = T extends 'common' ? Common : never

export const ky = _ky.create({ prefixUrl: 'https://graphql.anilist.co' })

// const connection =
//   navigator.connection ||
//   navigator.mozConnection ||
//   navigator.webkitConnection ||
//   null

export const imageSize = 'extraLarge'

export const GET_SEARCH_RESULT = /* GraphQL */ `
  query getSearchResult(
    $page: Int
    $genres: [String]
    $tags: [String]
    $year: Int
    $season: MediaSeason
    $format: [MediaFormat]
    $status: MediaStatus
    $country: CountryCode
    $source: MediaSource
    $searchText: String
    $sortBy: [MediaSort]
    $perPage: Int!
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        currentPage
        hasNextPage
      }
      media(
        genre_in: $genres
        genre_not_in: ["Hentai"]
        tag_in: $tags
        seasonYear: $year
        season: $season
        format_in: $format
        status: $status
        countryOfOrigin: $country
        source: $source
        search: $searchText
        sort: $sortBy
        format_not_in: [MANGA, NOVEL, ONE_SHOT, MUSIC]
      ) {
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
          nodes {
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

export const GET_ANIME_PAGE = {
  common: /* GraphQL */ `
    query common($id: Int!) {
      Media(id: $id) {
        title {
          romaji
          english
          native
        }
        coverImage {
          extraLarge
        }
        bannerImage
        description
        nextAiringEpisode {
          episode
          timeUntilAiring
        }
        format
        episodes
        duration
        status
        startDate {
          year
          month
          day
        }
        season
        seasonYear
        averageScore
        meanScore
        popularity
        favourites
        studios {
          edges {
            id
          }
        }
        source
        hashtag
        genres
        synonyms
      }
    }
  `,

  overview: /* GraphQL */ `
    query overview($id: Int!) {
      Media(id: $id) {
        description
        relations {
          edges {
            node {
              id
              title {
                romaji
              }
              coverImage {
                extraLarge
              }
              format
              status
            }
            id
            relationType
          }
        }
        characters(sort: ROLE, page: 1, perPage: 6) {
          edges {
            node {
              id
              name {
                full
              }
            }
            role
            voiceActors(language: JAPANESE) {
              id
              name {
                full
              }
              image {
                large
              }
            }
          }
        }
        staff(page: 1, perPage: 4) {
          edges {
            node {
              id
              name {
                full
              }
              image {
                large
              }
            }
            role
          }
        }
        stats {
          scoreDistribution {
            score
            amount
          }
          statusDistribution {
            status
            amount
          }
        }
        streamingEpisodes {
          title
          thumbnail
          url
        }
        trailer {
          id
          site
          thumbnail
        }
        recommendations {
          nodes {
            mediaRecommendation {
              id
              title {
                romaji
              }
              coverImage {
                extraLarge
              }
            }
          }
        }
      }
    }
  `,
  watch: /* GraphQL */ `
    query watch($id: Int!) {
      Media(id: $id) {
        streamingEpisodes {
          site
          title
          thumbnail
        }
      }
    }
  `,
  characters: /* GraphQL */ `
    query characters($id: Int!) {
      characters(sort: ROLE, page: 1, perPage: 6) {
        edges {
          node {
            id
            name {
              full
            }
          }
          role
          voiceActors(language: JAPANESE) {
            id
            name {
              full
            }
            image {
              large
            }
          }
        }
      }
    }
  `,
  staff: /* GraphQL */ `
    query characters($id: Int!) {
      staff(page: 1, perPage: 4) {
        edges {
          node {
            id
            name {
              full
            }
            image {
              large
            }
          }
          role
        }
      }
    }
  `,
  stats: /* GraphQL */ `
    query stats($id: Int!) {
      Media(id: $id) {
        rankings {
          rank
          context
          year
          season
          allTime
        }
        trends(sort: DATE_DESC) {
          nodes {
            date
            trending
            averageScore
            inProgress
          }
        }
        stats {
          scoreDistribution {
            score
            amount
          }
          statusDistribution {
            status
            amount
          }
        }
      }
    }
  `,
}
