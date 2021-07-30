import { useInfiniteQuery } from 'react-query'
import { GET_ANIME_PAGE, ky } from '../api/queries'
import { Staff } from '../api/types'

const fetchStaff = async (id: string, pageParam: number) => {
  const { data } = await ky
    .post('', {
      json: {
        query: GET_ANIME_PAGE.staff,
        variables: {
          id,
          page: pageParam,
        },
      },
    })
    .json()

  return data.Media.staff as Staff
}

export const useAnimeStaff = (id: string) =>
  useInfiniteQuery(
    ['staff', id],
    ({ pageParam = 1 }) => fetchStaff(id, pageParam),
    {
      getNextPageParam: lastpage => lastpage.pageInfo.currentPage + 1,
    }
  )
