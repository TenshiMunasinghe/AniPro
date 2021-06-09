import classnames from 'classnames'
import { createContext, useMemo } from 'react'
import {
  LazyComponentProps,
  ScrollPosition,
  trackWindowScroll,
} from 'react-lazy-load-image-component'

import { FetchedMedias } from '../../../api/types'
import { useFetchSearchResult } from '../../../hooks/useFetchSearchResult'
import { CardType } from '../../../pages/search/Search'
import NotFound from '../../common/NotFound/NotFound'
import styles from './SearchResult.module.scss'
import { useUpdateUrlParam } from '../../../hooks/useUpdateUrlParam'
import CardGrid from '../../common/CardGrid/CardGrid'

interface Medias extends FetchedMedias {
  rank?: number | null
}

interface Props extends LazyComponentProps {
  params: URLSearchParams
  cardType: CardType
}

const PAGES = [-2, -1, 0, 1, 2]

export const ScrollPositionContext = createContext<ScrollPosition | undefined>(
  undefined
)

const SearchResult = ({ params, cardType, scrollPosition }: Props) => {
  const {
    medias,
    isLoading,
    isError,
    pageInfo,
    isFetching,
  } = useFetchSearchResult(params)
  const { addFilterOptions } = useUpdateUrlParam()

  const _medias: Medias[] | null = useMemo(() => {
    if (!medias) return null

    return medias
      .map(m => {
        const _ranking = m.rankings.find(
          r => (r.context = 'highest rated all time')
        )
        const rank = _ranking ? _ranking.rank : null
        return { ...m, rank }
      })
      .sort((a, b) => (a.rank && b.rank ? a.rank - b.rank : 0))
  }, [medias])

  if (!isLoading && (isError || medias?.length === 0)) {
    return <NotFound />
  }

  const redirectToPage = (page: number) => {
    addFilterOptions({ page }, true)
  }

  return (
    <ScrollPositionContext.Provider value={scrollPosition}>
      <div className={styles.wrapper}>
        <CardGrid
          medias={_medias}
          isLoading={isLoading}
          isError={isError}
          cardType={cardType}
          imageSize='large'
        />
        {!isError && !isLoading && (
          <section className={styles.pages}>
            {pageInfo.currentPage !== 1 && (
              <button className={styles.page} onClick={() => redirectToPage(1)}>
                {'<<'}
              </button>
            )}
            {PAGES.map(p => {
              const page = pageInfo.currentPage + p

              if (page <= 0 || page > pageInfo.lastPage) return null

              return (
                <button
                  key={page}
                  className={classnames(
                    { [styles.current]: pageInfo.currentPage === page },
                    styles.page
                  )}
                  onClick={() => redirectToPage(page)}>
                  {page}
                </button>
              )
            })}
            {pageInfo.currentPage !== pageInfo.lastPage && (
              <button
                className={styles.page}
                onClick={() => redirectToPage(pageInfo.lastPage)}>
                {'>>'}
              </button>
            )}
          </section>
        )}
        {!isLoading && isFetching && (
          <div className={styles.fetchingIndicator}>Loading...</div>
        )}
      </div>
    </ScrollPositionContext.Provider>
  )
}

export default trackWindowScroll(SearchResult)
