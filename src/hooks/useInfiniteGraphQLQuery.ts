import { GraphQLClient } from 'graphql-request'
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseQueryOptions,
} from 'react-query'
import gqlRequestClient from '../api/graphqlClient'

interface UseQueryFn<
  TData extends Record<string, any>,
  TVariables extends Record<string, any>
> {
  (
    client: GraphQLClient,
    variables: TVariables,
    options?: UseQueryOptions<TData, Error>
  ): unknown
  document: string
  getKey: (variables: TVariables) => unknown[]
}

export function useInfiniteGraphQLQuery<
  TData extends Record<string, any>,
  TVariables extends Record<string, any>
>(
  useQuery: UseQueryFn<TData, TVariables>,
  getVariables: ({ pageParam }: { pageParam?: number }) => TVariables,
  options?: UseInfiniteQueryOptions<TData, Error>
) {
  return useInfiniteQuery<TData, Error>(
    useQuery.getKey(getVariables({})),
    ({ pageParam }) =>
      gqlRequestClient.request(useQuery.document, getVariables({ pageParam })),
    options
  )
}
