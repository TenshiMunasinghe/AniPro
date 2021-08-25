import classnames from 'classnames'
import { createContext } from 'react'
import {
  LazyComponentProps,
  ScrollPosition,
  trackWindowScroll,
} from 'react-lazy-load-image-component'
import gqlRequestClient from '../../../api/graphqlClient'
import {
  SearchResultQueryVariables,
  useSearchResultQuery,
} from '../../../generated/index'
import { useUpdateUrlParam } from '../../../hooks/useUpdateUrlParam'
import { CardType } from '../../../pages/search/Search'
import CardGrid from '../../common/CardGrid/CardGrid'
import LinearLoading from '../../common/LinearLoading/LinearLoading'
import NotFound from '../../common/NotFound/NotFound'
import styles from './SearchResult.module.scss'

interface Props extends LazyComponentProps {
  queryVars: SearchResultQueryVariables
  cardType: CardType
}

const PAGES = [-2, -1, 0, 1, 2]

export const ScrollPositionContext = createContext<ScrollPosition | undefined>(
  undefined
)

const SearchResult = ({ queryVars, cardType, scrollPosition }: Props) => {
  const { data, isLoading, isError, isFetching } = useSearchResultQuery(
    gqlRequestClient,
    queryVars
  )
  const { movePage } = useUpdateUrlParam()

  const medias = data?.Page?.media
  const pageInfo = data?.Page?.pageInfo

  if (!isLoading && (isError || medias?.length === 0)) {
    return <NotFound />
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
            {pageInfo?.currentPage !== 1 && (
              <button className={styles.page} onClick={() => movePage(1)}>
                {'<<'}
              </button>
            )}
            {PAGES.map(p => {
              const page = (pageInfo?.currentPage || 0) + p

              if (!pageInfo?.lastPage || page <= 0 || page > pageInfo.lastPage)
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
    </ScrollPositionContext.Provider>
  )
}

export default trackWindowScroll(SearchResult)
