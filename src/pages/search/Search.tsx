import React, { useState, useMemo, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

import styles from './Search.module.scss'
import { SEARCH_TEXT } from '../../api/queries'
import { QueryVar } from '../../api/types'
import {
  sortByOptions,
  filterOptions,
  FilterOptionKeys,
} from '../../filterOptions/filterOptions'
import { countryCode, Countries } from '../../filterOptions/countryCode'
import { useUpdateUrlParam } from '../../hooks/useUpdateUrlParam'
import { CardGrid } from '../../components/common/CardGrid/CardGrid'
import { ScrollButton } from '../../components/search/ScrollButton/ScrollButton'
import { SimpleSelect } from '../../components/common/SimpleSelect/SimpleSelect'
import { CardTypeButton } from '../../components/common/CardTypeButton/CardTypeButton'
import { Filters } from '../../components/common/Filters/Filters'
import { ActiveFilters } from '../../components/search/ActiveFilters/ActiveFilters'
import { addKey } from '../../utils/addKey'

const loadingCount = {
  chart: 4,
  cover: 12,
  table: 6,
} as const

const cardTypes = addKey(Object.keys(loadingCount))

export type CardType = keyof typeof loadingCount

export const Search = () => {
  const location = useLocation()
  const [cardType, setCardType] = useState<CardType>('chart')
  const updateUrlParams = useUpdateUrlParam()

  const search = useMemo(() => location.search, [location.search])

  const params = useMemo(() => new URLSearchParams(search), [search])

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

  const sortByOnChange = useCallback(
    (value: string | string[]) => {
      updateUrlParams(params, { value, key: 'sortBy' })
    },
    [updateUrlParams, params]
  )

  return (
    <>
      <Filters filterQuery={search} />
      <div className={styles.upperSection}>
        <section className={styles.extraOptions}>
          <SimpleSelect
            onChange={sortByOnChange}
            isMulti={false}
            options={sortByOptions}
            selected={params.get('sortBy') || 'TRENDING_DESC'}
          />
          <section className={styles.gridType}>
            {cardTypes.map(c => (
              <CardTypeButton
                key={c.key}
                cardType={c.value as CardType}
                setCardType={setCardType}
                isActive={c.value === cardType}
              />
            ))}
          </section>
        </section>

        <ActiveFilters />
      </div>

      <main>
        <CardGrid
          queryVariables={queryVariables}
          cardType={cardType}
          loadingCount={loadingCount[cardType]}
          allowLoadMore={true}
        />
      </main>
      <ScrollButton />
    </>
  )
}
