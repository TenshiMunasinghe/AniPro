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
        lastPage
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
  common: /* GraphQL */ `
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
        studios(isMain: true) {
          nodes {
            name
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
        characters(sort: [ROLE, RELEVANCE, ID], page: 1, perPage: 6) {
          edges {
            node {
              id
            }
          }
        }
        staff(page: 1, perPage: 4, sort: [RELEVANCE]) {
          edges {
            node {
              id
            }
          }
        }
        streamingEpisodes {
          title
        }
      }
    }
  `,

  overview: /* GraphQL */ `
    query overview($id: Int!) {
      Media(id: $id) {
        status
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
        characters(sort: [ROLE, RELEVANCE, ID], page: 1, perPage: 6) {
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
        staff(page: 1, perPage: 4, sort: [RELEVANCE]) {
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
        reviews(sort: [SCORE_DESC], perPage: 2) {
          nodes {
            id
            summary
            rating
            ratingAmount
            score
            user {
              name
              avatar {
                medium
              }
            }
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
          url
          title
          thumbnail
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
                color
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
          url
          title
          thumbnail
        }
      }
    }
  `,

  characters: /* GraphQL */ `
    query characters($id: Int!, $page: Int!) {
      Media(id: $id) {
        characters(sort: [ROLE, RELEVANCE, ID], page: $page, perPage: 6) {
          pageInfo {
            currentPage
            hasNextPage
          }
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
    }
  `,

  staff: /* GraphQL */ `
    query characters($id: Int!, $page: Int!) {
      Media(id: $id) {
        staff(page: $page, perPage: 4, sort: [RELEVANCE]) {
          pageInfo {
            currentPage
            hasNextPage
          }
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
    }
  `,

  reviews: /* GraphQL */ `
    query reviews($id: Int!) {
      Media(id: $id) {
        reviews(sort: [SCORE_DESC]) {
          nodes {
            id
            summary
            rating
            ratingAmount
            score
            user {
              name
              avatar {
                medium
              }
            }
          }
        }
      }
    }
  `,

  stats: /* GraphQL */ `
    query stats($id: Int!) {
      Media(id: $id) {
        status
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
