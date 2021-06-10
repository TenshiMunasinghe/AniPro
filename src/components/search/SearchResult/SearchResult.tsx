import classnames from 'classnames'
import { createContext } from 'react'
import {
  LazyComponentProps,
  ScrollPosition,
  trackWindowScroll,
} from 'react-lazy-load-image-component'
import { useFetchSearchResult } from '../../../hooks/useFetchSearchResult'
import { useUpdateUrlParam } from '../../../hooks/useUpdateUrlParam'
import { CardType } from '../../../pages/search/Search'
import CardGrid from '../../common/CardGrid/CardGrid'
import NotFound from '../../common/NotFound/NotFound'
import styles from './SearchResult.module.scss'

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

  if (!isLoading && (isError || medias?.length === 0)) {
    return <NotFound />
  }

  const redirectToPage = (page: number) => {
    addFilterOptions({ page }, true)
  }

  return (
    <ScrollPositionContext.Provider value={scrollPosition}>
      <div className={styles.container}>
        <CardGrid
          medias={medias}
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
          <div className={styles.fetchingIndicator} />
        )}
      </div>
    </ScrollPositionContext.Provider>
  )
}

export default trackWindowScroll(SearchResult)
