import React from 'react'

import {
  currentSeason,
  currentYear,
  nextSeason,
  nextYear,
} from '../../api/queries'
import { QueryVar, SearchResult } from '../../api/types'
import Content from '../../components/home/Content/Content'
import Footer from '../../components/home/Footer/Footer'
import { useWindowSizeStore, WindowSizeStore } from '../../zustand/stores'
import { CardType } from '../search/Search'
import styles from './Home.module.scss'

type Medias = {
  trending: SearchResult[]
  popularNow: SearchResult[]
  popularAllTime: SearchResult[]
  upComing: SearchResult[]
  topRated: SearchResult[]
}

const perPage = 8

const queryVars: { [key in keyof Medias]: QueryVar } = {
  trending: { sortBy: 'TRENDING_DESC', perPage },

  popularNow: {
    sortBy: 'POPULARITY_DESC',
    year: currentYear.toString(),
    season: currentSeason,
    perPage,
  },

  upComing: {
    year: nextYear.toString(),
    season: nextSeason,
    perPage,
    sortBy: 'TRENDING_DESC',
  },

  popularAllTime: { sortBy: 'POPULARITY_DESC', perPage },

  topRated: { sortBy: 'SCORE_DESC', perPage: 10 },
}

const windowSizeStoreSelector = ({ width }: WindowSizeStore) => width

const Home = () => {
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
      cardType: windowWidth >= 600 ? 'table' : 'cover',
      hasRank: true,
    },
  }

  return (
    <>
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

export default Home
