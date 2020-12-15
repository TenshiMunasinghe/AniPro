import React, { useState, memo } from 'react'
import { Link } from 'react-router-dom'

import styles from './CardCover.module.scss'
import { Image } from '../../Image/Image'
import { Popover } from '../../Popover/Popover'
import { SearchResult } from '../../../graphql/queries'
import { adjustColor } from '../../../helper'
import { useIsImageLoaded } from '../../../hooks/useIsImageLoaded'

interface Props {
  id: number
  image: SearchResult['coverImage']
  title: SearchResult['title']
  format: SearchResult['format']
  season: SearchResult['season']
  seasonYear: SearchResult['seasonYear']
  episodes: SearchResult['episodes']
  duration: SearchResult['duration']
  genres: SearchResult['genres']
  status: SearchResult['status']
  studios: SearchResult['studios']
  meanScore: SearchResult['meanScore']
  nextAiringEpisode: SearchResult['nextAiringEpisode']
  rank: number | null
}

export const CardCover = memo(
  ({
    image,
    title,
    id,
    format,
    season,
    seasonYear,
    episodes,
    duration,
    genres,
    studios,
    nextAiringEpisode,
    meanScore,
    rank,
  }: Props) => {
    const [isPopoverVisible, setIsPopoverVisible] = useState(false)
    const handleMouseOver = () => setIsPopoverVisible(true)
    const handleMouseLeave = () => setIsPopoverVisible(false)

    const { isImageLoaded, src } = useIsImageLoaded(image.extraLarge)
    const url = `/anime/${id}`

    const _style = {
      '--color-light': adjustColor(image.color, 'var(--lightness)'),
      '--color-original': image.color
        ? image.color
        : 'var(--color-foreground-100)',
    } as React.CSSProperties

    return (
      <div
        className={styles.popoverWrapper}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        style={_style}>
        <article className={styles.wrapper}>
          {rank && <div className={styles.rank}>#{rank}</div>}
          <Link
            to={url}
            className={
              styles.imageWrapper +
              ' ' +
              styles[isImageLoaded ? 'loaded' : 'loading']
            }>
            <Image className={styles.image} src={src} alt={title.romaji} />
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
)
