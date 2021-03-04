import React from 'react'
import { useParams } from 'react-router-dom'

import Header from '../../components/anime/Header/Header'
import styles from './Anime.module.scss'
import { useFetchAnimeDetails } from '../../hooks/useFetchAnimeDetail'

export type Tabs = 'overview' | 'watch' | 'characters' | 'staff' | 'stats'

type ParamTypes = {
  id: string
  tab: Tabs
}

const Anime = () => {
  const { id } = useParams<ParamTypes>()
  const { data } = useFetchAnimeDetails(id, 'common')
  if (!data) return <></>

  return (
    <section className={styles.wrapper}>
      <Header
        bannerImg={data.bannerImage}
        coverImg={data.coverImage}
        title={data.title.romaji}
        description={data.description}
        streamUrl={
          data.streamingEpisodes[data.streamingEpisodes.length - 1].url
        }
      />
    </section>
  )
}

export default Anime
