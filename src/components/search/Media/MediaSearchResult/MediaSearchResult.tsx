import classnames from 'classnames'
import React, { useCallback, useState } from 'react'
import gqlRequestClient from '../../../../api/graphqlClient'
import { sortByOptions } from '../../../../filterOptions/filterOptions'
import {
  MediaSort,
  MediaType,
  useMediaSearchQuery,
} from '../../../../generated/index'
import { useUpdateUrlParam } from '../../../../hooks/useUpdateUrlParam'
import { addKey } from '../../../../utils/addKey'
import CardGrid from '../../../common/CardGrid/CardGrid'
import CardTypeButton from '../../../common/CardTypeButton/CardTypeButton'
import Dropdown from '../../../common/Dropdown/Dropdown'
import LinearLoading from '../../../common/LinearLoading/LinearLoading'
import ActiveFilters from '../../ActiveFilters/ActiveFilters'
import FilterOptions from '../../FilterOptions/FilterOptions'
import styles from './MediaSearchResult.module.scss'

interface Props {
  type: MediaType
}

const PAGES = [-2, -1, 0, 1, 2]

const perPage = 20

export type CardType = 'chart' | 'cover' | 'table'

const CARD_TYPES: CardType[] = ['chart', 'cover', 'table']

const cardTypes = addKey(CARD_TYPES)

const MediaSearchResult = ({ type }: Props) => {
  const [cardType, setCardType] = useState<CardType>('chart')

  const { updateUrl, queryVars, movePage } = useUpdateUrlParam()

  const { data, isLoading, isError, isFetching } = useMediaSearchQuery(
    gqlRequestClient,
    {
      ...queryVars.initial,
      perPage,
      type,
    }
  )
  const sortByOnChange = useCallback(
    (value: string | string[]) => {
      updateUrl({ sortBy: value as MediaSort | MediaSort[] })
    },
    [updateUrl]
  )

  const medias = data?.Page?.media
  const pageInfo = data?.Page?.pageInfo

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
        <div className={styles.searchResult}>
          <CardGrid
            medias={medias}
            isLoading={isLoading}
            isError={isError}
            cardType={cardType}
            imageSize='large'
          />
          {!isError && !isLoading && (
            <section className={styles.pages}>
              {pageInfo?.currentPage !== 1 && (
                <button className={styles.page} onClick={() => movePage(1)}>
                  {'<<'}
                </button>
              )}
              {PAGES.map(p => {
                const page = (pageInfo?.currentPage || 0) + p

                if (
                  !pageInfo?.lastPage ||
                  page <= 0 ||
                  page > pageInfo.lastPage
                )
                  return null

                return (
                  <button
                    key={page}
                    className={classnames(
                      { [styles.current]: pageInfo?.currentPage === page },
                      styles.page
                    )}
                    onClick={() => movePage(page)}>
                    {page}
                  </button>
                )
              })}
              {pageInfo?.currentPage !== pageInfo?.lastPage && (
                <button
                  className={styles.page}
                  onClick={() =>
                    pageInfo?.lastPage && movePage(pageInfo?.lastPage)
                  }>
                  {'>>'}
                </button>
              )}
            </section>
          )}
          {!isLoading && isFetching && <LinearLoading />}
        </div>
      </main>
    </div>
  )
}

export default MediaSearchResult
