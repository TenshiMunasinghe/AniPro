import { useQuery } from 'react-query'
import { GET_ANIME_PAGE, ky } from '../api/queries'
import { Stats } from '../api/types'

const fetchStats = async (id: string) => {
  const { data } = await ky
    .post('', {
      json: {
        query: GET_ANIME_PAGE.stats,
        variables: {
          id,
        },
      },
    })
    .json()

  return data.Media as Stats
}

export const useAnimeStats = (id: string) =>
  useQuery(['stats', id], () => fetchStats(id))
