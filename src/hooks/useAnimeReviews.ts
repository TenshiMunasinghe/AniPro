import { useInfiniteQuery } from 'react-query'
import { GET_ANIME_PAGE, ky } from '../api/queries'
import { Review } from '../api/types'

const fetchReviews = async (id: string, pageParam: number) => {
  const { data } = await ky
    .post('', {
      json: {
        query: GET_ANIME_PAGE.reviews,
        variables: {
          id,
          page: pageParam,
        },
      },
    })
    .json()

  return data.Media.reviews as Review
}

export const useAnimeReviews = (id: string) =>
  useInfiniteQuery(
    ['reviews', id],
    ({ pageParam = 1 }) => fetchReviews(id, pageParam),
    {
      getNextPageParam: lastpage =>
        lastpage.pageInfo.hasNextPage
          ? lastpage.pageInfo.currentPage + 1
          : undefined,
    }
  )
