import { useCallback, useState } from 'react'
import CardTypeButton from '../../components/common/CardTypeButton/CardTypeButton'
import Dropdown from '../../components/common/Dropdown/Dropdown'
import ActiveFilters from '../../components/search/ActiveFilters/ActiveFilters'
import ScrollButton from '../../components/search/ScrollButton/ScrollButton'
import SearchOptions from '../../components/search/SearchOptions/SearchOptions'
import SearchResult from '../../components/search/SearchResult/SearchResult'
import { sortByOptions } from '../../filterOptions/filterOptions'
import { useUpdateUrlParam } from '../../hooks/useUpdateUrlParam'
import { addKey } from '../../utils/addKey'
import styles from './Search.module.scss'

export type CardType = 'chart' | 'cover' | 'table'

const CARD_TYPES: CardType[] = ['chart', 'cover', 'table']

const cardTypes = addKey(CARD_TYPES)

const Search = () => {
  const [cardType, setCardType] = useState<CardType>('chart')

  const { updateUrl, initialParams } = useUpdateUrlParam()

  const sortByOnChange = useCallback(
    (value: string | string[]) => {
      updateUrl({ sortBy: value as string })
    },
    [updateUrl]
  )

  return (
    <div className={styles.container}>
      <div className={styles.upperSection}>
        <ActiveFilters />
        <section className={styles.extraOptions}>
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
          <Dropdown
            onChange={sortByOnChange}
            isMulti={false}
            options={sortByOptions}
            selected={initialParams.get('sortBy') || 'TRENDING_DESC'}
          />
        </section>
      </div>

      <main className={styles.mainContent}>
        <SearchOptions />

        <SearchResult params={initialParams} cardType={cardType} />
        <ScrollButton />
      </main>
    </div>
  )
}

export default Search
