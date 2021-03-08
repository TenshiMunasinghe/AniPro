import React, { memo, useState } from 'react'
import { LazyLoadImage, ScrollPosition } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'

import { SearchResult } from '../../../../api/types'
import { adjustColor } from '../../../../utils/adjustColor'
import Popover from '../../Popover/Popover'
import styles from './CardCover.module.scss'

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
  rank?: number | null
  scrollPosition: ScrollPosition
}

const CardCover = memo(
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
    scrollPosition,
  }: Props) => {
    const [isPopoverVisible, setIsPopoverVisible] = useState(false)
    const showPopover = () => setIsPopoverVisible(true)
    const hidePopover = () => setIsPopoverVisible(false)

    const url = `/anime/${id}`

    const _style = {
      '--color-adjusted': adjustColor(image.color, 'var(--lightness)'),
      '--color-original': image.color
        ? image.color
        : 'var(--color-foreground-100)',
    } as React.CSSProperties

    return (
      <div
        className={styles.popoverWrapper}
        onMouseOver={showPopover}
        onMouseLeave={hidePopover}
        onFocus={showPopover}
        onBlur={hidePopover}
        style={_style}>
        <article className={styles.wrapper}>
          {rank && <div className={styles.rank}>#{rank}</div>}
          <Link to={url} tabIndex={-1} className={styles.imageWrapper}>
            <LazyLoadImage
              className={styles.image}
              src={image.large}
              alt={title.romaji}
              scrollPosition={scrollPosition}
              effect='opacity'
            />
          </Link>
          <Link to={url} className={styles.titleWrapper}>
            <h3 className={styles.title}>{title.romaji}</h3>
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

export default CardCover
