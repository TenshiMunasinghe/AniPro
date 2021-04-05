import React, { useCallback, useMemo, useState } from 'react'

import { SEARCH_TEXT } from '../../api/queries'
import { QueryVar } from '../../api/types'
import CardGrid from '../../components/common/CardGrid/CardGrid'
import CardTypeButton from '../../components/common/CardTypeButton/CardTypeButton'
import Filters from '../../components/common/Filters/Filters'
import SimpleSelect from '../../components/common/SimpleSelect/SimpleSelect'
import ActiveFilters from '../../components/search/ActiveFilters/ActiveFilters'
import ScrollButton from '../../components/search/ScrollButton/ScrollButton'
import { Countries, countryCode } from '../../filterOptions/countryCode'
import {
  FilterOptionKeys,
  filterOptions,
  sortByOptions,
} from '../../filterOptions/filterOptions'
import { useUpdateUrlParam } from '../../hooks/useUpdateUrlParam'
import { addKey } from '../../utils/addKey'
import styles from './Search.module.scss'

const loadingCount = {
  chart: 4,
  cover: 12,
  table: 6,
} as const

const cardTypes = addKey(Object.keys(loadingCount))

export type CardType = keyof typeof loadingCount

const Search = () => {
  const [cardType, setCardType] = useState<CardType>('chart')
  const { addFilterOptions, params } = useUpdateUrlParam()

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
      addFilterOptions({ value, key: 'sortBy' }, false)
    },
    [addFilterOptions]
  )

  return (
    <>
      <Filters />
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
          imageSize='large'
          loadingCount={loadingCount[cardType]}
          allowLoadMore={true}
        />
      </main>
      <ScrollButton />
    </>
  )
}

export default Search
