import React, { memo } from 'react'
import range from 'lodash/range'

import styles from './CardGrid.module.scss'
import { CardChart } from '../Cards/CardChart/CardChart'
import { CardCover } from '../Cards/CardCover/CardCover'
import { CardTable } from '../Cards/CardTable/CardTable'
import { CardLoading } from '../Cards/CardLoading/CardLoading'
import { QueryData } from '../../graphql/queries'
import { CardType } from '../../pages/search/Search'

interface Props {
  loading: boolean
  media?: QueryData['Page']['media']
  cardType: CardType
  loadingCount: number
}

export const CardGrid = memo(
  ({ loading, media, cardType, loadingCount }: Props) => {
    return (
      <section className={styles.slider + ' ' + styles[cardType]}>
        {media &&
          media.map((m: QueryData['Page']['media'][number]) => {
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
    )
  }
)
