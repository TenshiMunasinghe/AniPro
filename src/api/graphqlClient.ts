import { GraphQLClient } from 'graphql-request'
export const gqlRequestClient = new GraphQLClient('https://graphql.anilist.co')
export default gqlRequestClient
