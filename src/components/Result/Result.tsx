import React from 'react'

import styles from './Result.module.scss'
import Card from '../Card/Card'
import CardLoading from '../CardLoading/CardLoading'
import { QueryData, imageSize } from '../../graphql/queries'

interface Props {
  loading: boolean
  media?: QueryData['Page']['media']
}

const Result = ({ loading, media }: Props) => {
  return (
    <div className={styles.slider}>
      {media &&
        media.map((m: QueryData['Page']['media'][number]) => (
          <Card
            key={m.id}
            id={m.id}
            image={m.coverImage[imageSize]}
            title={m.title}
            genres={m.genres}
            status={m.status}
            nextAiring={m.nextAiringEpisode}
            description={m.description}
          />
        ))}
      {loading && (
        <>
          <CardLoading />
          <CardLoading />
          <CardLoading />
        </>
      )}
    </div>
  )
}

export default Result
