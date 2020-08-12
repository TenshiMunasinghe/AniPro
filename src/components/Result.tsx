import React from 'react'
import styled from 'styled-components'

import Card from '../components/Card'
import CardLoading from './CardLoading'
import { QueryData, imageSize } from '../graphql/queries'

interface Props {
  loading: boolean
  media?: QueryData['Page']['media']
}

const Result = ({ loading, media }: Props) => {
  return (
    <Slider>
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
    </Slider>
  )
}

const Slider = styled.div`
  display: Grid;
  padding-top: 1rem;
`

export default Result
