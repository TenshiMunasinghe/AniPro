import _ky from 'ky'

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

export const ky = _ky.create({ prefixUrl: 'https://graphql.anilist.co' })

// const connection =
//   navigator.connection ||
//   navigator.mozConnection ||
//   navigator.webkitConnection ||
//   null

export const imageSize = 'large'

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
        bannerImage
        coverImage {
          extraLarge
          large
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
        rankings {
          rank
          context
          year
          season
          allTime
        }
      }
    }
  }
`

export const GET_ANIME_PAGE = {
  overview: /* GraphQL */ `
    query common($id: Int!) {
      Media(id: $id) {
        title {
          romaji
          english
          native
        }
        coverImage {
          large
          color
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
        endDate {
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
        externalLinks {
          url
          site
        }
        relations {
          edges {
            node {
              id
              title {
                romaji
              }
              coverImage {
                large
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
                large
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
