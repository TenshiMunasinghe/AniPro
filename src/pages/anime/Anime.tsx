import React from 'react'
import { useParams } from 'react-router-dom'

import { Overview } from '../../api/types'
import Header from '../../components/anime/Header/Header'
import { useFetchAnimeDetails } from '../../hooks/useFetchAnimeDetail'
import styles from './Anime.module.scss'

export const TAB = [
  'overview',
  'watch',
  'characters',
  'staff',
  'stats',
] as const

export type TabsType = typeof TAB[number]

export type ParamTypes = {
  id: string
  tab: TabsType
}

const filterTabs = (data: Overview) => {
  const tabs = [...TAB]
  const tabsArr = [
    ['watch', data.streamingEpisodes],
    ['staff', data.staff.edges],
    ['characters', data.characters.edges],
  ]
  for (const subArr of tabsArr) {
    if (subArr[1].length === 0) {
      const idx = tabs.indexOf(subArr[0] as TabsType)
      tabs.splice(idx, 1)
    }
  }
  return tabs
}

const Anime = () => {
  const { id } = useParams<ParamTypes>()
  const { data } = useFetchAnimeDetails(id, 'overview')

  if (!data) return <></>

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
        tabs={filterTabs(data)}
      />
    </section>
  )
}

export default Anime
