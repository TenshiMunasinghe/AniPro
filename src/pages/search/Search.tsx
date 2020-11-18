import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import debounce from 'lodash/debounce'
import uniqBy from 'lodash/uniqBy'
import produce from 'immer'
import { v4 } from 'uuid'
import { useFormContext } from 'react-hook-form'

import styles from './Search.module.scss'
import { useFilterStateStore, FilterStateStore } from '../../zustand/stores'
import {
  QueryData,
  QueryVar,
  GET_SEARCH_RESULT,
  ky,
} from '../../graphql/queries'
import { SortBy, sortByOptions } from '../../filterOptions/index'
import { countryCode, Countries } from '../../filterOptions/countryCode'
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'
import { CardGrid } from '../../components/CardGrid/CardGrid'
import { ScrollButton } from '../../components/ScrollButton/ScrollButton'
import { SimpleSelect } from '../../components/SimpleSelect/SimpleSelect'
import { NotFound } from '../../components/NotFound/NotFound'
import { CardTypeButton } from '../../components/CardTypeButton/CardTypeButton'

const _cardTypes = ['chart', 'cover', 'table'] as const

const loadingCount = {
  chart: 4,
  cover: 12,
  table: 6,
}

const cardTypes = _cardTypes.map(c => ({ key: v4(), type: c }))

export type CardType = typeof _cardTypes[number]

type FetchNewDataParam = { queryVariables: QueryVar }

type LoadMoreParam = {
  queryVariables: QueryVar
  data: QueryData | null
}

const filterStateSelector = ({
  filterState,
  setFilterState,
}: FilterStateStore) => ({ filterState, setFilterState })

export const Search = () => {
  const { getValues, reset } = useFormContext()
  const searchText = getValues('searchText')
  const { filterState, setFilterState } = useFilterStateStore(
    filterStateSelector
  )
  const [cardType, setCardType] = useState<CardType>('table')
  const [data, setData] = useState<QueryData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const mountedRef = useRef(true)

  const queryVariables: QueryVar = useMemo(
    () => ({
      ...Object.fromEntries(
        Object.entries(filterState).filter(([_, value]) => value.length > 0)
      ),
      searchText: searchText ? searchText : null,
      country: countryCode[filterState.country as Countries],
      perPage: 10,
    }),
    [filterState, searchText]
  )

  const fetchNewData = useCallback(
    debounce(async ({ queryVariables }: FetchNewDataParam) => {
      setData(null)
      try {
        setLoading(true)
        const res: { data: QueryData } = await ky
          .post('', {
            json: {
              query: GET_SEARCH_RESULT,
              variables: queryVariables,
            },
          })
          .json()
        if (!res || !mountedRef.current) {
          return
        }
        setData(res.data)
      } catch (e) {
        setError(e)
        console.error(e)
      }
      setLoading(false)
    }, 800),
    []
  )

  const loadMore = useCallback(
    async ({ data, queryVariables }: LoadMoreParam) => {
      if (!data) return
      try {
        setLoading(true)
        const res: { data: QueryData } = await ky
          .post('', {
            json: {
              query: GET_SEARCH_RESULT,
              variables: {
                ...queryVariables,
                page: data.Page.pageInfo.currentPage + 1,
                perPage: 20,
              },
            },
          })
          .json()
        if (!res || !mountedRef) {
          return
        }
        setData(prev => {
          if (prev === null) return res.data
          return produce(prev, next => {
            next.Page.pageInfo = { ...res.data.Page.pageInfo }
            next.Page.media = uniqBy(
              [...next.Page.media, ...res.data.Page.media],
              'id'
            )
          })
        })
      } catch (e) {
        setError(e)
        console.error(e)
      }
      setLoading(false)
    },
    []
  )

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  // requesting on filter state change
  useEffect(() => {
    fetchNewData({ queryVariables })
    window.scrollTo(0, 0)
  }, [queryVariables, fetchNewData])

  // pagination
  useInfiniteScroll(() => {
    if (error || !data || !data.Page.pageInfo.hasNextPage || loading) {
      return
    }
    loadMore({ queryVariables, data })
  })

  const sortByOnChange = (value: string | string[]) => {
    setFilterState({ sortBy: value as SortBy })
  }

  const clearSearch = () => {
    reset({ searchText: '' })
  }

  return (
    <>
      <div className={styles.upperSection}>
        <section className={styles.extraOptions}>
          <SimpleSelect
            onChange={sortByOnChange}
            isMulti={false}
            options={sortByOptions}
            selected={filterState.sortBy}
          />
          <section className={styles.gridType}>
            {cardTypes.map(c => (
              <CardTypeButton
                key={c.key}
                cardType={c.type}
                setCardType={setCardType}
                isActive={c.type === cardType}
              />
            ))}
          </section>
        </section>

        {searchText && (
          <section className={styles.searchDetails}>
            <div className={styles.resultsFor}>
              Showing results for:{' '}
              <span className={styles.searchText}>{searchText}</span>
            </div>
            <button onClick={clearSearch} className={styles.clearSearch}>
              Clear search
            </button>
          </section>
        )}
      </div>

      <main>
        {error || (data && data?.Page.media.length === 0) ? (
          <NotFound />
        ) : (
          <CardGrid
            loading={loading}
            media={data?.Page.media}
            cardType={cardType}
            loadingCount={loadingCount[cardType]}
          />
        )}
      </main>
      <ScrollButton />
    </>
  )
}
