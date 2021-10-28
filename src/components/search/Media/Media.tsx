import React, { useCallback, useState } from 'react'
import { sortByOptions } from '../../../filterOptions/filterOptions'
import { MediaSort } from '../../../generated'
import { MediaType } from '../../../generated/index'
import { useUpdateUrlParam } from '../../../hooks/useUpdateUrlParam'
import { addKey } from '../../../utils/addKey'
import CardTypeButton from '../../common/CardTypeButton/CardTypeButton'
import Dropdown from '../../common/Dropdown/Dropdown'
import ActiveFilters from '../ActiveFilters/ActiveFilters'
import FilterOptions from '../FilterOptions/FilterOptions'
import styles from './Media.module.scss'
import MediaSearchResult from './MediaSearchResult/MediaSearchResult'

export type CardType = 'chart' | 'cover' | 'table'

const CARD_TYPES: CardType[] = ['chart', 'cover', 'table']

const cardTypes = addKey(CARD_TYPES)

interface Props {
  type: MediaType
}

const Media = ({ type }: Props) => {
  const [cardType, setCardType] = useState<CardType>('chart')

  const { updateUrl, queryVars } = useUpdateUrlParam()

  const sortByOnChange = useCallback(
    (value: string | string[]) => {
      updateUrl({ sortBy: value as MediaSort | MediaSort[] })
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
                cardType={c.value}
                setCardType={setCardType}
                isActive={c.value === cardType}
              />
            ))}
          </section>
          <Dropdown
            onChange={sortByOnChange}
            isMulti={false}
            options={sortByOptions}
            selected={queryVars.initial.sortBy || MediaSort.TrendingDesc}
          />
        </section>
      </div>

      <main className={styles.mainContent}>
        <FilterOptions />
        <MediaSearchResult
          queryVars={{ ...queryVars.initial, type }}
          cardType={cardType}
        />
      </main>
    </div>
  )
}

export default Media
