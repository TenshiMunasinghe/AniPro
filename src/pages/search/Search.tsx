import { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import CardTypeButton from '../../components/common/CardTypeButton/CardTypeButton'
import Dropdown from '../../components/common/Dropdown/Dropdown'
import NavBar from '../../components/common/NavBar/NavBar'
import Footer from '../../components/home/Footer/Footer'
import ActiveFilters from '../../components/search/ActiveFilters/ActiveFilters'
import FilterOptions from '../../components/search/FilterOptions/FilterOptions'
import MediaSearchResult from '../../components/search/MediaSearchResult/MediaSearchResult'
import ScrollButton from '../../components/search/ScrollButton/ScrollButton'
import { MediaTypes, sortByOptions } from '../../filterOptions/filterOptions'
import { MediaSort, MediaType } from '../../generated/index'
import { useUpdateUrlParam } from '../../hooks/useUpdateUrlParam'
import { addKey } from '../../utils/addKey'
import styles from './Search.module.scss'

export type CardType = 'chart' | 'cover' | 'table'

const CARD_TYPES: CardType[] = ['chart', 'cover', 'table']

const cardTypes = addKey(CARD_TYPES)

const Search = () => {
  const { type } = useParams<{ type?: keyof typeof MediaTypes }>()

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
          <MediaSearchResult
            queryVars={{
              ...queryVars.initial,
              type: type ? MediaTypes[type] : MediaType.Anime,
            }}
            cardType={cardType}
          />
          <ScrollButton />
        </main>
      </div>
      <Footer />
    </>
  )
}

export default Search
