import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import uniqBy from 'lodash/uniqBy'
import produce from 'immer'
import { v4 } from 'uuid'
import { useFormContext } from 'react-hook-form'

import styles from './Search.module.scss'
import {
  QueryData,
  QueryVar,
  GET_SEARCH_RESULT,
  ky,
  SEARCH_TEXT,
} from '../../api/queries'
import {
  sortByOptions,
  filterOptions,
  FilterOptionKeys,
} from '../../filterOptions/filterOptions'
import { countryCode, Countries } from '../../filterOptions/countryCode'
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'
import { CardGrid } from '../../components/common/CardGrid/CardGrid'
import { ScrollButton } from '../../components/common/ScrollButton/ScrollButton'
import { SimpleSelect } from '../../components/common/SimpleSelect/SimpleSelect'
import { NotFound } from '../../components/NotFound/NotFound'
import { CardTypeButton } from '../../components/common/CardTypeButton/CardTypeButton'
import { Filters } from '../../components/common/Filters/Filters'
import { useUpdateUrlParam } from '../../hooks/useUpdateUrlParam'

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

export const Search = () => {
  const { getValues, reset } = useFormContext()
  const searchText = getValues(SEARCH_TEXT)
  const updateUrlParams = useUpdateUrlParam()
  const location = useLocation()
  const [cardType, setCardType] = useState<CardType>('chart')
  const [data, setData] = useState<QueryData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const mountedRef = useRef(true)

  const params = useMemo(() => new URLSearchParams(location.search), [
    location.search,
  ])

  const queryVariables: QueryVar = useMemo(() => {
    const filterParams = Object.fromEntries(
      Array.from(params.keys()).map(key => {
        if (
          filterOptions[key as FilterOptionKeys].isMulti === false ||
          key === SEARCH_TEXT
        ) {
          return [key, params.get(key)]
        } else {
          return [key, params.getAll(key)]
        }
      })
    )

    return {
      ...filterParams,
      sortBy: filterParams.sortBy ? filterParams.sortBy : 'TRENDING_DESC',
      searchText: searchText ? searchText : null,
      country: countryCode[params.get('country') as Countries],
      perPage: 10,
    }
  }, [searchText, params])

  const fetchNewData = useMemo(
    () => async ({ queryVariables }: FetchNewDataParam) => {
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
    },
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
    updateUrlParams(params, { value, key: 'sortBy' })
  }

  const clearSearch = () => {
    reset({ searchText: '' })
  }

  const sortBy = params.get('sortBy')

  return (
    <>
      <Filters filterQuery={location.search} />
      <div className={styles.upperSection}>
        <section className={styles.extraOptions}>
          <SimpleSelect
            onChange={sortByOnChange}
            isMulti={false}
            options={sortByOptions}
            selected={sortBy ? sortBy : 'TRENDING_DESC'}
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
