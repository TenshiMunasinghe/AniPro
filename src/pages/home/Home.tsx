import React from 'react'

import styles from './Home.module.scss'
import { useWindowSizeStore, WindowSizeStore } from '../../zustand/stores'
import {
  currentYear,
  currentSeason,
  nextYear,
  nextSeason,
} from '../../api/queries'
import { SearchResult, QueryVar } from '../../api/types'
import { CardType } from '../search/Search'
import { Footer } from '../../components/home/Footer/Footer'
import { Filters } from '../../components/common/Filters/Filters'
import { Content } from '../../components/home/Content/Content'

type Medias = {
  trending: SearchResult[]
  popularNow: SearchResult[]
  popularAllTime: SearchResult[]
  upComing: SearchResult[]
  topRated: SearchResult[]
}

const queryVars: { [key in keyof Medias]: QueryVar } = {
  trending: { sortBy: 'TRENDING_DESC', perPage: 5 },

  popularNow: {
    sortBy: 'POPULARITY_DESC',
    year: currentYear.toString(),
    season: currentSeason,
    perPage: 5,
  },

  upComing: {
    year: nextYear.toString(),
    season: nextSeason,
    perPage: 5,
    sortBy: 'TRENDING_DESC',
  },

  popularAllTime: { sortBy: 'POPULARITY_DESC', perPage: 5 },

  topRated: { sortBy: 'SCORE_DESC', perPage: 10 },
}

const windowSizeStoreSelector = ({ width }: WindowSizeStore) => width

export const Home = () => {
  const windowWidth = useWindowSizeStore(windowSizeStoreSelector)

  const contents: {
    [key in keyof Medias]: {
      text: string
      cardType: CardType
      hasRank?: boolean
    }
  } = {
    trending: {
      text: 'Trending Now',
      cardType: 'cover',
    },

    popularNow: {
      text: 'Popular This Season',
      cardType: 'cover',
    },

    upComing: {
      text: 'Upcoming Next Season',
      cardType: 'cover',
    },

    popularAllTime: {
      text: 'All Time Popular',
      cardType: 'cover',
    },

    topRated: {
      text: 'Top Animes',
      cardType: windowWidth > 1200 ? 'table' : 'cover',
      hasRank: true,
    },
  }

  return (
    <>
      <Filters />
      <main className={styles.wrapper}>
        {Object.keys(queryVars).map(k => {
          const key = k as keyof Medias

          return (
            <Content
              key={key}
              content={contents[key]}
              queryVar={queryVars[key]}
            />
          )
        })}
      </main>
      <Footer />
    </>
  )
}
