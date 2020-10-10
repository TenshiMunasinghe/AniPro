import React from 'react'

import styles from './Result.module.scss'
import Card from '../Card/Card'
import CardLoading from '../CardLoading/CardLoading'
import { QueryData } from '../../graphql/queries'
import { CardType } from '../../pages/search/Search'
import SimpleCard from '../SimpleCard/SimpleCard'
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

const Result = ({ loading, media, cardType }: Props) => {
  return (
    <main className={styles.slider + ' ' + styles[cardType]}>
      {media &&
        media.map((m: QueryData['Page']['media'][number]) => {
          switch (cardType) {
            case 'simple':
              return (
                <SimpleCard
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
                  streamingEpisodes={m.streamingEpisodes}
                  duration={m.duration}
                  meanScore={m.meanScore}
                  studio={m.studios.nodes[0].name}
                />
              )

            default:
              return (
                <Card
                  key={m.id}
                  id={m.id}
                  image={m.coverImage}
                  title={m.title}
                  genres={m.genres}
                  status={m.status}
                  nextAiring={m.nextAiringEpisode}
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
}

export default React.memo(Result)
