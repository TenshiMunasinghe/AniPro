import { useCallback, useEffect, useRef, useState } from 'react'

import { GET_ANIME_PAGE, ky } from '../api/queries'
import { AnimeDetails } from '../api/types'
import { Tabs } from '../pages/anime/Anime'

export const useFetchAnimeDetails = <T extends Tabs | 'common'>(
  id: string,
  tab: T
) => {
  const [data, setData] = useState<AnimeDetails<typeof tab>>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  const fetchAnimeDetail = useCallback(
    async (tab: T) => {
      setLoading(true)
      try {
        const res: { data: { Media: AnimeDetails<typeof tab> } } = await ky
          .post('', {
            json: {
              query: GET_ANIME_PAGE[tab],
              variables: {
                id: parseInt(id),
              },
            },
          })
          .json()

        if (!isMounted || !res) return

        setData(res.data.Media)
      } catch (e) {
        if (isMounted.current) setError(e)

        console.error(e)
      }
      setLoading(false)
    },
    [id]
  )

  useEffect(() => {
    fetchAnimeDetail(tab)
  }, [fetchAnimeDetail, tab])

  return {
    data,
    loading,
    error,
    fetchAnimeDetail,
  }
}
