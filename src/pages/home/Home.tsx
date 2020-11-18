import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { Redirect } from 'react-router-dom'
import { useFormContext } from 'react-hook-form'

import styles from './Home.module.scss'
import {
  useFilterStateStore,
  FilterStateStore,
  initialFilterState,
  useWindowSizeStore,
  WindowSizeStore,
} from '../../zustand/stores'
import { useSkip } from '../../hooks/useSkip'
import {
  ky,
  GET_SEARCH_RESULT,
  SearchResult,
  currentYear,
  currentSeason,
  QueryVar,
} from '../../graphql/queries'
import { CardType } from '../search/Search'
import { CardGrid } from '../../components/CardGrid/CardGrid'

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
    year: currentYear,
    season: currentSeason,
    perPage: 5,
  },

  upComing: { year: 2021, perPage: 5, sortBy: 'TRENDING_DESC' },

  popularAllTime: { sortBy: 'POPULARITY_DESC', perPage: 5 },

  topRated: { sortBy: 'SCORE_DESC', perPage: 10 },
}

const filterStateSelector = ({
  filterState,
  setFilterState,
  resetFilterState,
}: FilterStateStore) => ({ filterState, setFilterState, resetFilterState })

const windowSizeStoreSelector = ({ width }: WindowSizeStore) => width

export const Home = () => {
  const {
    reset: resetSearchText,
    formState: { isSubmitted },
  } = useFormContext()
  const { filterState, setFilterState, resetFilterState } = useFilterStateStore(
    filterStateSelector
  )
  const windowWidth = useWindowSizeStore(windowSizeStoreSelector)
  const [isStateChanged, setIsStateChanged] = useState(false)

  const [medias, setMedias] = useState<Medias | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(async () => {
    const promises = Object.values(queryVars).map(queryVar =>
      ky.post('', {
        json: {
          query: GET_SEARCH_RESULT,
          variables: {
            page: 1,
            ...queryVar,
          },
        },
      })
    )

    setLoading(true)

    const response = await Promise.all(promises)
    const json = await Promise.all(response.map(res => res.json()))
    const data: SearchResult[][] = json.map(j => j.data.Page.media)
    const keys = Object.keys(queryVars)
    const medias = Object.fromEntries<SearchResult[]>(
      keys.map(key => [key, data[keys.indexOf(key)]])
    )
    setMedias(medias as Medias)
    setLoading(false)
  }, [])

  useEffect(() => {
    resetSearchText({ searchText: '' })
    resetFilterState()
  }, [resetSearchText, resetFilterState])

  useSkip(
    () => {
      setIsStateChanged(true)
    },
    [filterState, setIsStateChanged],
    2
  )

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const contents: {
    [key in keyof Medias]: {
      text: string
      cardType: CardType
    }
  } = useMemo(
    () => ({
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
        cardType: windowWidth > 1040 ? 'table' : 'cover',
      },
    }),
    [windowWidth]
  )

  if (isSubmitted || isStateChanged) {
    return <Redirect push={true} to='/search' />
  }

  return (
    <main className={styles.wrapper}>
      {Object.keys(contents).map(key => {
        const content = contents[key as keyof Medias]
        const queryVar = queryVars[key as keyof Medias]
        const filterQuery = Object.fromEntries(
          Object.entries(queryVar)
            .filter(([key, _]) => Object.keys(initialFilterState).includes(key))
            .map(([key, val]) => [
              key,
              typeof val === 'number' ? val.toString() : val,
            ])
        )
        return (
          <section className={styles.content} key={key}>
            <h3
              className={styles.contentTitle}
              onClick={() => setFilterState(filterQuery)}>
              {content.text}
            </h3>
            <CardGrid
              media={medias?.[key as keyof Medias]}
              loading={loading}
              cardType={content.cardType}
              loadingCount={queryVar.perPage}
            />
          </section>
        )
      })}
    </main>
  )
}
