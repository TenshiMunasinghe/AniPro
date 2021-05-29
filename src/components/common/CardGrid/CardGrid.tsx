import classnames from 'classnames'
import range from 'lodash/range'
import { createContext, useMemo } from 'react'
import {
  LazyComponentProps,
  ScrollPosition,
  trackWindowScroll,
} from 'react-lazy-load-image-component'

import { SearchResult } from '../../../api/types'
import {
  useFetchSearchResult,
  DEFAULT_PER_PAGE,
} from '../../../hooks/useFetchSearchResult'
import { CardType } from '../../../pages/search/Search'
import CardChart from '../Cards/CardChart/CardChart'
import CardCover from '../Cards/CardCover/CardCover'
import CardLoading from '../Cards/CardLoading/CardLoading'
import CardTable from '../Cards/CardTable/CardTable'
import NotFound from '../NotFound/NotFound'
import styles from './CardGrid.module.scss'
import { useUpdateUrlParam } from '../../../hooks/useUpdateUrlParam'

interface Medias extends SearchResult {
  rank?: number | null
}

interface Props extends LazyComponentProps {
  params: URLSearchParams
  cardType: CardType
  imageSize: 'large' | 'extraLarge'
  loadingCount?: number
  hasRank?: boolean
  hasPages: boolean
  sideScroll?: boolean
}

const PAGES = [-2, -1, 0, 1, 2]

export const ScrollPositionContext = createContext<ScrollPosition | undefined>(
  undefined
)

const CardGrid = ({
  params,
  cardType,
  imageSize,
  loadingCount = parseInt(new URLSearchParams(params).get('perPage') || '') ||
    DEFAULT_PER_PAGE,
  hasRank = false,
  hasPages,
  sideScroll = false,
  scrollPosition,
}: Props) => {
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
    if (!hasRank) return medias

    return medias
      .map(m => {
        const _ranking = m.rankings.find(
          r => (r.context = 'highest rated all time')
        )
        const rank = _ranking ? _ranking.rank : null
        return { ...m, rank }
      })
      .sort((a, b) => (a.rank && b.rank ? a.rank - b.rank : 0))
  }, [hasRank, medias])

  if (!isLoading && (isError || _medias?.length === 0)) {
    return <NotFound />
  }

  const redirectToPage = (page: number) => {
    addFilterOptions({ page }, true)
  }

  return (
    <ScrollPositionContext.Provider value={scrollPosition}>
      <div
        className={classnames(styles.wrapper, {
          [styles.sideScroll]: sideScroll,
        })}>
        <section className={classnames(styles.slider, styles[cardType])}>
          {_medias &&
            _medias.map(m => {
              switch (cardType) {
                case 'cover':
                  return (
                    <CardCover
                      key={m.id}
                      id={m.id}
                      image={m.coverImage[imageSize]}
                      color={m.coverImage.color}
                      title={m.title}
                      genres={m.genres}
                      status={m.status}
                      nextAiringEpisode={m.nextAiringEpisode}
                      format={m.format}
                      season={m.season}
                      seasonYear={m.seasonYear}
                      episodes={m.episodes}
                      duration={m.duration}
                      meanScore={m.meanScore}
                      studios={m.studios}
                      rank={m.rank}
                    />
                  )

                case 'table':
                  return (
                    <CardTable
                      key={m.id}
                      id={m.id}
                      image={{
                        cover: m.coverImage[imageSize],
                        banner: m.bannerImage,
                      }}
                      color={m.coverImage.color}
                      title={m.title}
                      genres={m.genres}
                      status={m.status}
                      nextAiringEpisode={m.nextAiringEpisode}
                      format={m.format}
                      season={m.season}
                      seasonYear={m.seasonYear}
                      episodes={m.episodes}
                      duration={m.duration}
                      meanScore={m.meanScore}
                      studios={m.studios}
                      popularity={m.popularity}
                      rank={m.rank}
                    />
                  )

                case 'chart':
                  return (
                    <CardChart
                      key={m.id}
                      id={m.id}
                      image={m.coverImage[imageSize]}
                      color={m.coverImage.color}
                      title={m.title}
                      genres={m.genres}
                      description={m.description}
                      meanScore={m.meanScore}
                    />
                  )

                default:
                  return <></>
              }
            })}
          {isLoading &&
            range(0, loadingCount).map((_, i) => (
              <CardLoading type={cardType} key={i} />
            ))}
        </section>
        {!isError && !isLoading && hasPages && (
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
        {hasPages && !isLoading && isFetching && (
          <div className={styles.fetchingIndicator}>Loading...</div>
        )}
      </div>
    </ScrollPositionContext.Provider>
  )
}

export default trackWindowScroll(CardGrid)
