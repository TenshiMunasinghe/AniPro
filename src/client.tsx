import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache(),
})

const date = new Date()
const SEASONS = [
  { name: 'SPRING', months: [3, 4, 5] },
  { name: 'SUMMER', months: [6, 7, 8] },
  { name: 'AUTUMN', months: [9, 10, 11] },
  { name: 'WINTER', months: [12, 1, 2] },
]
const month = date.getMonth()
const current = SEASONS.find(({ months }) => months.includes(month))

export const currentSeason = current ? current.name : ''

export const currentYear = date.getFullYear()

export default client
