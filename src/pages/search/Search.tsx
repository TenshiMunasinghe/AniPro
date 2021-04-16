import React, { useCallback, useState } from 'react'

import CardGrid from '../../components/common/CardGrid/CardGrid'
import CardTypeButton from '../../components/common/CardTypeButton/CardTypeButton'
import SimpleSelect from '../../components/common/SimpleSelect/SimpleSelect'
import ActiveFilters from '../../components/search/ActiveFilters/ActiveFilters'
import ScrollButton from '../../components/search/ScrollButton/ScrollButton'
import { sortByOptions } from '../../filterOptions/filterOptions'
import { useUpdateUrlParam } from '../../hooks/useUpdateUrlParam'
import { addKey } from '../../utils/addKey'
import styles from './Search.module.scss'
import SearchOptions from '../../components/search/SearchOptions/SearchOptions'

const loadingCount = {
  chart: 4,
  cover: 12,
  table: 6,
} as const

const cardTypes = addKey(Object.keys(loadingCount))

export type CardType = keyof typeof loadingCount

const Search = () => {
  const [cardType, setCardType] = useState<CardType>('chart')
  const { addFilterOptions, initialParams } = useUpdateUrlParam()

  const sortByOnChange = useCallback(
    (value: string | string[]) => {
      addFilterOptions({ sortBy: value as string }, true)
    },
    [addFilterOptions]
  )

  return (
    <>
      <SearchOptions />
      <div className={styles.upperSection}>
        <section className={styles.extraOptions}>
          <SimpleSelect
            onChange={sortByOnChange}
            isMulti={false}
            options={sortByOptions}
            selected={initialParams.get('sortBy') || 'TRENDING_DESC'}
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
          params={initialParams}
          cardType={cardType}
          imageSize='large'
          loadingCount={loadingCount[cardType]}
          hasPages={true}
        />
      </main>
      <ScrollButton />
    </>
  )
}

export default Search
