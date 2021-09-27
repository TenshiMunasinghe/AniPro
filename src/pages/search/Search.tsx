import { useCallback, useState } from 'react'
import CardTypeButton from '../../components/common/CardTypeButton/CardTypeButton'
import Dropdown from '../../components/common/Dropdown/Dropdown'
import NavBar from '../../components/common/NavBar/NavBar'
import Footer from '../../components/home/Footer/Footer'
import ActiveFilters from '../../components/search/ActiveFilters/ActiveFilters'
import FilterOptions from '../../components/search/FilterOptions/FilterOptions'
import ScrollButton from '../../components/search/ScrollButton/ScrollButton'
import SearchResult from '../../components/search/SearchResult/SearchResult'
import { sortByOptions } from '../../filterOptions/filterOptions'
import { MediaSort } from '../../generated/index'
import { useUpdateUrlParam } from '../../hooks/useUpdateUrlParam'
import { addKey } from '../../utils/addKey'
import styles from './Search.module.scss'

export type CardType = 'chart' | 'cover' | 'table'

const CARD_TYPES: CardType[] = ['chart', 'cover', 'table']

const cardTypes = addKey(CARD_TYPES)

const Search = () => {
  const [cardType, setCardType] = useState<CardType>('chart')

  const { updateUrl, queryVars } = useUpdateUrlParam()

  const sortByOnChange = useCallback(
    (value: string | string[]) => {
      updateUrl({ sortBy: value as MediaSort | MediaSort[] })
    },
    [updateUrl]
  )

  return (
    <>
      <NavBar />
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
              selected={queryVars.initial.sortBy || MediaSort.TrendingDesc}
            />
          </section>
        </div>

        <main className={styles.mainContent}>
          <FilterOptions />

          <SearchResult queryVars={queryVars.initial} cardType={cardType} />
          <ScrollButton />
        </main>
      </div>
      <Footer />
    </>
  )
}

export default Search
