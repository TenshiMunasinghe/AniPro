import React from 'react'
import { useParams } from 'react-router-dom'

import { Header } from '../../components/anime/Header/Header'
import styles from './Anime.module.scss'
import { useFetchAnimeDetails } from '../../hooks/useFetchAnimeDetail'

export type Tabs = 'overview' | 'watch' | 'characters' | 'staff' | 'stats'

type ParamTypes = {
  id: string
  tab: Tabs
}

export const Anime = () => {
  const { id, tab = 'overview' } = useParams<ParamTypes>()
  const { data } = useFetchAnimeDetails(id, 'common')
  if (!data) return <></>

  return (
    <section className={styles.wrapper}>
      <Header
        bannerImg={data.bannerImage}
        coverImg={data.coverImage.extraLarge}
        title={data.title.romaji}
        description={data.description}
      />
    </section>
  )
}
