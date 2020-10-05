import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import _ from 'lodash'
import produce from 'immer'
import { useRecoilState } from 'recoil'
import { useFormContext } from 'react-hook-form'
import { FaTh, FaThLarge } from 'react-icons/fa'

import styles from './Search.module.scss'
import {
  QueryData,
  QueryVar,
  GET_SEARCH_RESULT,
  ky,
} from '../../graphql/queries'
import Result from '../../components/Result/Result'
import ScrollButton from '../../components/ScrollButton/ScrollButton'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import { SortBy, sortByOptions } from '../../filterOptions/index'
import { countryCode, Countries } from '../../filterOptions/countryCode'
import SimpleSelect from '../../components/SimpleSelect/SimpleSelect'
import { filterStateAtom } from '../../recoil/atoms'
import NotFound from '../../components/NotFound/NotFound'

export type CardType = 'default' | 'simple'

type FetchNewDataParam = { queryVariables: QueryVar; signal: any }

type LoadMoreParam = {
  queryVariables: QueryVar
  data: QueryData | null
  error: any
  loading: boolean
  signal: any
}

const SearchResult = () => {
  const { getValues, reset } = useFormContext()
  const searchText = getValues('searchText')
  const [filterState, setFilterState] = useRecoilState(filterStateAtom)
  const [cardType, setCardType] = useState<CardType>('default')
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
    _.debounce(async ({ queryVariables, signal }: FetchNewDataParam) => {
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
    async ({ data, error, loading, queryVariables, signal }: LoadMoreParam) => {
      if (error || !data || !data.Page.pageInfo.hasNextPage || loading) {
        return
      }
      try {
        setLoading(true)
        const res: { data: QueryData } = await ky
          .post('', {
            json: {
              query: GET_SEARCH_RESULT,
              variables: {
                ...queryVariables,
                page: data.Page.pageInfo.currentPage + 1,
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
            next.Page.media = _.uniqBy(
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
    const controller = new AbortController()
    const { signal } = controller
    loadMore({ signal, queryVariables, loading, data, error })

    return () => {
      controller.abort()
    }
  })

  const sortByOnChange = (value: string | string[]) => {
    setFilterState(prev => ({
      ...prev,
      sortBy: value as SortBy,
    }))
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

      {loading || (!error && data && data.Page.media.length > 0) ? (
        <Result
          loading={loading}
          media={data?.Page.media}
          cardType={cardType}
        />
      ) : (
        <NotFound />
      )}
      <ScrollButton />
    </>
  )
}

export default SearchResult
