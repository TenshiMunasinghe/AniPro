import { useQuery } from 'react-query'
import { GET_ANIME_PAGE, ky } from '../api/queries'
import { Overview } from '../api/types'

const fetchOverview = async (id: string) => {
  const {
    data: { Media },
  } = await ky
    .post('', {
      json: {
        query: GET_ANIME_PAGE.overview,
        variables: {
          id,
        },
      },
    })
    .json()

  return Media as Overview
}

export const useFetchAnimeOverview = (id: string) =>
  useQuery(['overview', id], () => fetchOverview(id))
