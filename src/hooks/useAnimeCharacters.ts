import { useInfiniteQuery } from 'react-query'
import { GET_ANIME_PAGE, ky } from '../api/queries'
import { Characters } from '../api/types'

const fetchCharacters = async (id: string, pageParam: number) => {
  const { data } = await ky
    .post('', {
      json: {
        query: GET_ANIME_PAGE.characters,
        variables: {
          id,
          page: pageParam,
        },
      },
    })
    .json()

  return data.Media.characters as Characters
}

export const useAnimeCharacters = (id: string) =>
  useInfiniteQuery(
    ['characters', id],
    ({ pageParam = 1 }) => fetchCharacters(id, pageParam),
    {
      getNextPageParam: lastpage => lastpage.pageInfo.currentPage + 1,
    }
  )
