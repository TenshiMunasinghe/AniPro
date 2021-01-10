import React, { useState, useMemo, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { v4 } from 'uuid'

import styles from './Search.module.scss'
import { QueryVar, SEARCH_TEXT } from '../../api/queries'
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
import { useFetchAnimes } from '../../hooks/useFetchAnimes'

const _cardTypes = ['chart', 'cover', 'table'] as const

const loadingCount = {
  chart: 4,
  cover: 12,
  table: 6,
}

const cardTypes = _cardTypes.map(c => ({ key: v4(), type: c }))

export type CardType = typeof _cardTypes[number]

export const Search = () => {
  const updateUrlParams = useUpdateUrlParam()
  const location = useLocation()
  const [cardType, setCardType] = useState<CardType>('chart')
  const { data, loading, error, fetchData } = useFetchAnimes()

  const params = useMemo(() => new URLSearchParams(location.search), [
    location.search,
  ])

  const queryVariables: QueryVar = useMemo(() => {
    const filterParams = Object.fromEntries(
      Array.from(params.keys()).map(key => {
        if (!Object.keys(filterOptions).includes(key)) {
          return []
        }

        if (
          !filterOptions[key as FilterOptionKeys].isMulti ||
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
      searchText: params.get(SEARCH_TEXT) ? params.get(SEARCH_TEXT) : null,
      country: countryCode[params.get('country') as Countries],
      perPage: 10,
    }
  }, [params])

  // requesting on filter state change
  useEffect(() => {
    fetchData({ queryVariables, paginate: false })
    // eslint-disable-next-line
  }, [queryVariables])

  // pagination
  useInfiniteScroll(() => {
    if (error || !data || !data.Page.pageInfo.hasNextPage || loading) {
      return
    }
    fetchData({ queryVariables, paginate: true })
  })

  const sortByOnChange = (value: string | string[]) => {
    updateUrlParams(params, { value, key: 'sortBy' })
  }

  const clearSearch = () => {
    updateUrlParams(params, { key: SEARCH_TEXT, value: '' })
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

        {params.get(SEARCH_TEXT) && (
          <section className={styles.searchDetails}>
            <div className={styles.resultsFor}>
              Showing results for:{' '}
              <span className={styles.searchText}>
                {params.get(SEARCH_TEXT)}
              </span>
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
