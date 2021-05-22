import React, { memo, useState } from 'react'

import { SearchResult } from '../../../../api/types'
import { adjustColor } from '../../../../utils/adjustColor'
import Popover from './Popover/Popover'
import styles from './CardCover.module.scss'
import Title from '../components/Title/Title'
import CoverImage from '../components/CoverImage/CoverImage'

interface Props {
  id: number
  image: string
  color: string
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
    color,
  }: Props) => {
    const [isPopoverVisible, setIsPopoverVisible] = useState(false)
    const showPopover = () => setIsPopoverVisible(true)
    const hidePopover = () => setIsPopoverVisible(false)

    const _style = {
      '--color-adjusted': adjustColor(color, 'var(--lightness)'),
      '--color-original': color ? color : 'var(--color-foreground-100)',
    } as React.CSSProperties

    return (
      <div
        className={styles.popoverWrapper}
        onMouseOver={showPopover}
        onMouseLeave={hidePopover}
        onFocus={showPopover}
        onBlur={hidePopover}
        style={_style}>
        <article className={styles.container}>
          {rank && <div className={styles.rank}>#{rank}</div>}
          <CoverImage id={id} src={image} title={title.romaji} color={color} />
          <h3 className={styles.title}>
            <Title id={id} text={title.romaji} color={color} />
          </h3>
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
          color={color}
          meanScore={meanScore}
        />
      </div>
    )
  }
)

export default CardCover
