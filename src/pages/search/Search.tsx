import React, { useCallback, useState } from 'react'

import CardGrid from '../../components/common/CardGrid/CardGrid'
import CardTypeButton from '../../components/common/CardTypeButton/CardTypeButton'
import Dropdown from '../../components/common/Dropdown/Dropdown'
import ActiveFilters from '../../components/search/ActiveFilters/ActiveFilters'
import ScrollButton from '../../components/search/ScrollButton/ScrollButton'
import { sortByOptions } from '../../filterOptions/filterOptions'
import { useUpdateUrlParam } from '../../hooks/useUpdateUrlParam'
import { addKey } from '../../utils/addKey'
import styles from './Search.module.scss'
import SearchOptions from '../../components/search/SearchOptions/SearchOptions'

export type CardType = 'chart' | 'cover' | 'table'

const CARD_TYPES: CardType[] = ['chart', 'cover', 'table']

const cardTypes = addKey(CARD_TYPES)

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
    <div className={styles.container}>
      <SearchOptions />

      <main>
        <div className={styles.upperSection}>
          <section className={styles.extraOptions}>
            <Dropdown
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

        <CardGrid
          params={initialParams}
          cardType={cardType}
          imageSize='large'
          hasPages={true}
        />
        <ScrollButton />
      </main>
    </div>
  )
}

export default Search
