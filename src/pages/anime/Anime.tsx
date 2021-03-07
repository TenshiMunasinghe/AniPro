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
  console.log(data.externalLinks)

  return (
    <section className={styles.wrapper}>
      <Header
        bannerImg={data.bannerImage}
        coverImg={data.coverImage}
        title={data.title.romaji}
        description={data.description}
        streamUrl={
          data.streamingEpisodes.length > 0
            ? data.streamingEpisodes[data.streamingEpisodes.length - 1].url
            : undefined
        }
        siteUrl={
          data.externalLinks.find(link => link.site === 'Official Site')?.url
        }
      />
    </section>
  )
}

export default Anime
