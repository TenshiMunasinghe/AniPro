import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import debounce from 'lodash/debounce'
import uniqBy from 'lodash/uniqBy'
import produce from 'immer'
import { useFormContext } from 'react-hook-form'
import { FaTh, FaThLarge } from 'react-icons/fa'

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
import { Result } from '../../components/Result/Result'
import { ScrollButton } from '../../components/ScrollButton/ScrollButton'
import { SimpleSelect } from '../../components/SimpleSelect/SimpleSelect'
import { NotFound } from '../../components/NotFound/NotFound'

export type CardType = 'default' | 'simple' | 'table'

type FetchNewDataParam = { queryVariables: QueryVar; signal: any }

type LoadMoreParam = {
  queryVariables: QueryVar
  data: QueryData | null
  signal: any
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
    debounce(async ({ queryVariables, signal }: FetchNewDataParam) => {
      setData(null)
      try {
        setLoading(true)
        const res: { data: QueryData } = await ky
          .post('', {
            json: {
              query: GET_SEARCH_RESULT,
              variables: queryVariables,
              signal,
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
    async ({ data, queryVariables, signal }: LoadMoreParam) => {
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
                signal,
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
    const controller = new AbortController()
    const { signal } = controller
    fetchNewData({ signal, queryVariables })
    window.scrollTo(0, 0)

    return () => {
      controller.abort()
    }
  }, [queryVariables, fetchNewData])

  // pagination
  useInfiniteScroll(() => {
    if (error || !data || !data.Page.pageInfo.hasNextPage || loading) {
      return
    }
    const controller = new AbortController()
    const { signal } = controller
    loadMore({ signal, queryVariables, data })

    return () => {
      controller.abort()
    }
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
            <button onClick={() => setCardType('default')}>
              <FaThLarge aria-label='default card' />
            </button>
            <button onClick={() => setCardType('simple')}>
              <FaTh aria-label='simple card' />
            </button>
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

      {error || (data && data.Page.media.length === 0) ? (
        <NotFound />
      ) : (
        <Result
          loading={loading}
          media={data?.Page.media}
          cardType={cardType}
        />
      )}
      <ScrollButton />
    </>
  )
}
