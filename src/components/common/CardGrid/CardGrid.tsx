import React, { useMemo } from 'react'
import range from 'lodash/range'

import styles from './CardGrid.module.scss'
import { CardChart } from '../Cards/CardChart/CardChart'
import { CardCover } from '../Cards/CardCover/CardCover'
import { CardTable } from '../Cards/CardTable/CardTable'
import { CardLoading } from '../Cards/CardLoading/CardLoading'
import { QueryVar, SearchResult } from '../../../api/types'
import { CardType } from '../../../pages/search/Search'
import { useFetchSearchResult } from '../../../hooks/useFetchSearchResult'
import { NotFound } from '../NotFound/NotFound'

interface Medias extends SearchResult {
  rank?: number | null
}

interface Props {
  queryVariables: Partial<QueryVar>
  cardType: CardType
  loadingCount: number
  hasRank?: boolean
  allowLoadMore: boolean
}

export const CardGrid = ({
  queryVariables,
  cardType,
  loadingCount,
  hasRank = false,
  allowLoadMore,
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

  if (hasRank)
    medias?.forEach(m =>
      console.log(
        m.title.romaji,
        m.rankings.filter(r => r.allTime)
      )
    )

  const _medias: Medias[] | null = useMemo(() => {
    if (!medias) return null

    if (hasRank) {
      return medias
        .map(m => {
          const _ranking = m.rankings.find(
            r => (r.context = 'highest rated all time')
          )
          const rank = _ranking ? _ranking.rank : null
          return { ...m, rank }
        })
        .sort((a, b) => (a.rank && b.rank ? a.rank - b.rank : 0))
    } else {
      return medias
    }
  }, [hasRank, medias])

  const fetchMore = () => {
    allowLoadMore && fetchData({ queryVariables, paginate: true })
  }

  if (error || _medias?.length === 0) {
    return <NotFound />
  }

  return (
    <div className={styles.wrapper}>
      <section className={styles.slider + ' ' + styles[cardType]}>
        {_medias &&
          _medias.map(m => {
            switch (cardType) {
              case 'cover':
                return (
                  <CardCover
                    key={m.id}
                    id={m.id}
                    image={m.coverImage}
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
                    image={m.coverImage}
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
                    image={m.coverImage}
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
