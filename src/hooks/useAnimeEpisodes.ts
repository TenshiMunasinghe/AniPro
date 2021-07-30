import { useQuery } from 'react-query'
import { GET_ANIME_PAGE, ky } from '../api/queries'
import { Watch } from '../api/types'

const fetchEpisodes = async (id: string) => {
  const { data } = await ky
    .post('', {
      json: {
        query: GET_ANIME_PAGE.watch,
        variables: {
          id,
        },
      },
    })
    .json()

  return data.Media.streamingEpisodes as Watch['streamingEpisodes']
}

export const useAnimeEpisodes = (id: string) =>
  useQuery(['watch', id], () => fetchEpisodes(id))
