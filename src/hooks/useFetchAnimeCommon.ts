import { useQuery } from 'react-query'
import { GET_ANIME_PAGE, ky } from '../api/queries'
import { Common } from '../api/types'

const fetchCommon = async (id: string) => {
  const {
    data: { Media },
  } = await ky
    .post('', {
      json: {
        query: GET_ANIME_PAGE.common,
        variables: {
          id,
        },
      },
    })
    .json()

  return Media as Common
}

export const useFetchAnimeCommon = (id: string) =>
  useQuery(['common', id], () => fetchCommon(id))
