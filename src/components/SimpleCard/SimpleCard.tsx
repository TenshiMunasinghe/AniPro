import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './SimpleCard.module.scss'
import Image from '../Image/Image'
import Popover from '../Popover/Popover'
import { imageSize, Media } from '../../graphql/queries'
import { adjustColor } from '../../helper'

interface Props {
  id: number
  image: Media['coverImage']
  title: Media['title']
  format: Media['format']
  season: Media['season']
  seasonYear: Media['seasonYear']
  episodes: Media['episodes']
  duration: Media['duration']
  genres: Media['genres']
  status: Media['status']
  studios: Media['studios']
  meanScore: Media['meanScore']
  nextAiringEpisode: Media['nextAiringEpisode']
}

const SimpleCard = ({
  image,
  title,
  id,
  format,
  season,
  seasonYear,
  episodes,
  duration,
  genres,
  status,
  studios,
  nextAiringEpisode,
  meanScore,
}: Props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)
  const handleMouseOver = () => setIsPopoverVisible(true)
  const handleMouseLeave = () => setIsPopoverVisible(false)
  const url = `/anime/${id}`

  const _style = {
    '--color-light': adjustColor(image.color, 70),
    '--color-original': image.color,
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
        <Link to={url} className={styles.title}>
          {title.romaji}
        </Link>
      </article>

      <Popover
        isVisible={isPopoverVisible}
        genres={genres}
        nextAiringEpisode={nextAiringEpisode}
        format={format}
        season={season}
        seasonYear={seasonYear}
        episodes={episodes}
        duration={duration}
        studios={studios}
        color={image.color}
        meanScore={meanScore}
      />
    </div>
  )
}

export default React.memo(SimpleCard)
