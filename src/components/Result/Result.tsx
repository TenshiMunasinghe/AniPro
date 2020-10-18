import React, { memo } from 'react'

import styles from './Result.module.scss'
import { CardChart } from '../CardChart/CardChart'
import { CardCover } from '../CardCover/CardCover'
import { CardLoading } from '../CardLoading/CardLoading'
import { QueryData } from '../../graphql/queries'
import { CardType } from '../../pages/search/Search'
import range from 'lodash/range'

interface Props {
  loading: boolean
  media?: QueryData['Page']['media']
  cardType: CardType
}

const loadingSkeletonCount = {
  default: 4,
  simple: 12,
}

export const Result = memo(({ loading, media, cardType }: Props) => {
  return (
    <main className={styles.slider + ' ' + styles[cardType]}>
      {media &&
        media.map((m: QueryData['Page']['media'][number]) => {
          switch (cardType) {
            case 'simple':
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

            default:
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
          }
        })}
      {loading &&
        range(0, loadingSkeletonCount[cardType]).map((_, i) => (
          <CardLoading type={cardType} key={i} />
        ))}
    </main>
  )
})
