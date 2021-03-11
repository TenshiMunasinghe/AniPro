import classnames from 'classnames'
import range from 'lodash/range'
import React, { useMemo } from 'react'
import { LazyComponentProps, trackWindowScroll } from 'react-lazy-load-image-component'

import { QueryVar, SearchResult } from '../../../api/types'
import { useFetchSearchResult } from '../../../hooks/useFetchSearchResult'
import { CardType } from '../../../pages/search/Search'
import CardChart from '../Cards/CardChart/CardChart'
import CardCover from '../Cards/CardCover/CardCover'
import CardLoading from '../Cards/CardLoading/CardLoading'
import CardTable from '../Cards/CardTable/CardTable'
import NotFound from '../NotFound/NotFound'
import styles from './CardGrid.module.scss'

interface Medias extends SearchResult {
  rank?: number | null
}

interface Props extends LazyComponentProps {
  queryVariables: Partial<QueryVar>
  cardType: CardType
  imageSize: 'large' | 'extraLarge'
  loadingCount: number
  hasRank?: boolean
  allowLoadMore: boolean
  sideScroll?: boolean
}

const CardGrid = ({
  queryVariables,
  cardType,
  imageSize,
  loadingCount,
  hasRank = false,
  allowLoadMore,
  sideScroll = false,
  scrollPosition,
}: Props) => {
  const {
    medias,
    loading,
    error,
    fetchData,
    nextPageInfo,
  } = useFetchSearchResult({
    queryVariables,
  })

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

  if (error || _medias?.length === 0) {
    return <NotFound />
  }

  const fetchMore = () => {
    allowLoadMore && fetchData({ queryVariables, paginate: true })
  }

  return (
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
                    scrollPosition={scrollPosition}
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
                    scrollPosition={scrollPosition}
                  />
                )

              case 'chart':
                return (
                  <CardChart
                    key={m.id}
                    id={m.id}
                    image={m.coverImage[imageSize]}
                    color={m.coverImage[imageSize]}
                    title={m.title}
                    genres={m.genres}
                    description={m.description}
                    meanScore={m.meanScore}
                    scrollPosition={scrollPosition}
                  />
                )

              default:
                return <></>
            }
          })}
        {loading &&
          range(0, loadingCount).map((_, i) => (
            <CardLoading type={cardType} key={i} />
          ))}
      </section>
      {!loading && !error && nextPageInfo.hasNextPage && allowLoadMore && (
        <button className={styles.loadMore} onClick={fetchMore}>
          Load More! щ(ﾟДﾟщ)
        </button>
      )}
    </div>
  )
}

export default trackWindowScroll(CardGrid)
