import React, { useState, useMemo, useEffect, useCallback } from 'react'
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
import { useUpdateUrlParam } from '../../hooks/useUpdateUrlParam'
import { useFetchAnimes } from '../../hooks/useFetchAnimes'
import { CardGrid } from '../../components/common/CardGrid/CardGrid'
import { ScrollButton } from '../../components/search/ScrollButton/ScrollButton'
import { SimpleSelect } from '../../components/common/SimpleSelect/SimpleSelect'
import { NotFound } from '../../components/common/NotFound/NotFound'
import { CardTypeButton } from '../../components/common/CardTypeButton/CardTypeButton'
import { Filters } from '../../components/common/Filters/Filters'
import { ActiveFilters } from '../../components/search/ActiveFilters/ActiveFilters'

const _cardTypes = ['chart', 'cover', 'table'] as const

const loadingCount = {
  chart: 4,
  cover: 12,
  table: 6,
}

const cardTypes = _cardTypes.map(c => ({ key: v4(), type: c }))

export type CardType = typeof _cardTypes[number]

export const Search = () => {
  const location = useLocation()
  const [cardType, setCardType] = useState<CardType>('chart')
  const { data, loading, error, fetchData } = useFetchAnimes()
  const updateUrlParams = useUpdateUrlParam()

  const params = useMemo(() => new URLSearchParams(location.search), [
    location.search,
  ])

  const paramsObj = useMemo(
    () =>
      Object.fromEntries(
        Array.from(params.keys()).map(key => {
          if (key === SEARCH_TEXT) {
            return [SEARCH_TEXT, params.get(SEARCH_TEXT)]
          }
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
      ),
    [params]
  )

  const queryVariables: QueryVar = useMemo(() => {
    return {
      ...paramsObj,
      sortBy: paramsObj.sortBy ? paramsObj.sortBy : 'TRENDING_DESC',
      searchText: paramsObj[SEARCH_TEXT] ? paramsObj[SEARCH_TEXT] : null,
      country: countryCode[paramsObj.country as Countries],
      perPage: 10,
    }
  }, [paramsObj])

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

  const sortByOnChange = useCallback(
    (value: string | string[]) => {
      updateUrlParams(params, { value, key: 'sortBy' })
    },
    [params, updateUrlParams]
  )

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

        <ActiveFilters />
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
