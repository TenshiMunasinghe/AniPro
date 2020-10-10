import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './SimpleCard.module.scss'
import Image from '../Image/Image'
import Popover from '../Popover/Popover'
import { imageSize } from '../../graphql/queries'
import { adjustColor } from '../../helper'

interface Props {
  id: number
  image: {
    [key: string]: string
    color: string
  }
  title: {
    english: string
    romaji: string
  }
  format: string
  season?: string
  seasonYear?: number
  streamingEpisodes?: number
  duration?: number
  genres: string[]
  status: string
  studio: string
  meanScore: number
  nextAiringEpisode: {
    timeUntilAiring: number
    episode: number
  } | null
}

const SimpleCard = ({
  image,
  title,
  id,
  format,
  season,
  seasonYear,
  streamingEpisodes,
  duration,
  genres,
  status,
  studio,
  nextAiringEpisode,
  meanScore,
}: Props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)
  const handleMouseOver = () => setIsPopoverVisible(true)
  const handleMouseLeave = () => setIsPopoverVisible(false)
  const url = `/anime/${id}`

  const _style = {
    '--color-text': adjustColor(image.color, 70),
    '--color-background': image.color,
  } as React.CSSProperties

  return (
    <div
      className={styles.popoverWrapper}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      style={_style}>
      <article className={styles.wrapper}>
        <Link
          to={url}
          className={
            styles.imageWrapper + ' ' + styles[isLoaded ? 'loaded' : 'loading']
          }>
          <Image
            className={styles.image}
            onLoad={() => setIsLoaded(true)}
            src={image[imageSize]}
            alt={title.romaji}
          />
        </Link>
        <h5 className={styles.title}>
          <Link to={url}>{title.romaji}</Link>
        </h5>
      </article>

      <Popover
        isVisible={isPopoverVisible}
        genres={genres}
        nextAiringEpisode={nextAiringEpisode}
        format={format}
        season={season}
        seasonYear={seasonYear}
        streamingEpisodes={streamingEpisodes}
        duration={duration}
        studio={studio}
        color={image.color}
        meanScore={meanScore}
      />
    </div>
  )
}

export default React.memo(SimpleCard)
