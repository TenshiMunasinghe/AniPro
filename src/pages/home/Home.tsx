import React from 'react'

import styles from './Home.module.scss'
import { useWindowSizeStore, WindowSizeStore } from '../../zustand/stores'
import {
  SearchResult,
  currentYear,
  currentSeason,
  nextYear,
  nextSeason,
  QueryVar,
} from '../../api/queries'
import { CardType } from '../search/Search'
import { CardGrid } from '../../components/common/CardGrid/CardGrid'
import { Footer } from '../../components/home/Footer/Footer'
import { Filters } from '../../components/common/Filters/Filters'
import { useUpdateUrlParam } from '../../hooks/useUpdateUrlParam'
import { filterOptions } from '../../filterOptions/filterOptions'

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
  const updateUrLParam = useUpdateUrlParam()

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
        {Object.keys(queryVars).map(key => {
          const content = contents[key as keyof Medias]

          const { perPage } = queryVars[key as keyof Medias]

          const queryVar = Object.fromEntries(
            Object.entries(queryVars[key as keyof Medias]).filter(([k, _]) =>
              //filter out the query variable which is not a filter option(eg:perPage)
              Object.keys(filterOptions).includes(k)
            )
          )
          const setFilterQuery = () =>
            updateUrLParam(new URLSearchParams(), queryVar as Partial<QueryVar>)

          return (
            <section className={styles.content} key={key}>
              <button className={styles.button} onClick={setFilterQuery}>
                <h3 className={styles.contentTitle}>{content.text}</h3>
                <span className={styles.viewAll}>View All</span>
              </button>
              <CardGrid
                queryVariables={queryVars[key as keyof Medias]}
                cardType={content.cardType}
                loadingCount={perPage}
                hasRank={content.hasRank}
                allowLoadMore={false}
              />
            </section>
          )
        })}
      </main>
      <Footer />
    </>
  )
}
