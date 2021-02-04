import React from 'react'
import range from 'lodash/range'

import styles from './CardGrid.module.scss'
import { CardChart } from '../Cards/CardChart/CardChart'
import { CardCover } from '../Cards/CardCover/CardCover'
import { CardTable } from '../Cards/CardTable/CardTable'
import { CardLoading } from '../Cards/CardLoading/CardLoading'
import { QueryData, QueryVar } from '../../../api/queries'
import { CardType } from '../../../pages/search/Search'
import { useFetchAnimes } from '../../../hooks/useFetchAnimes'
import { NotFound } from '../NotFound/NotFound'

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
  const { medias, loading, error, fetchData, nextPageInfo } = useFetchAnimes({
    queryVariables,
    paginate: false,
  })

  const fetchMore = () => {
    allowLoadMore && fetchData({ queryVariables, paginate: true })
  }

  if (error || medias?.length === 0) {
    return <NotFound />
  }

  return (
    <div className={styles.wrapper}>
      <section className={styles.slider + ' ' + styles[cardType]}>
        {medias &&
          medias.map((m: QueryData['Page']['media'][number]) => {
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
                    rank={hasRank && m.rank ? m.rank : null}
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
                    rank={hasRank && m.rank ? m.rank : null}
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
