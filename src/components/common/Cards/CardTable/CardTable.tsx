import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { LazyLoadImage, ScrollPosition } from 'react-lazy-load-image-component'

import styles from './CardTable.module.scss'
import { SearchResult } from '../../../../api/types'
import { currentYear } from '../../../../api/queries'
import { toStartCase } from '../../../../utils/toStartCase'
import { adjustColor } from '../../../../utils/adjustColor'
import { formatLabel } from '../../../../utils/formatLabel'
import { pluralize } from '../../../../utils/pluralize'
import { airingInfo } from '../../../../utils/airingInfo'
import Genres from '../../Genres/Genres'
import FaceIcon from '../../FaceIcon/FaceIcon'

interface Props {
  id: number
  image: {
    cover: SearchResult['coverImage']
    banner: SearchResult['bannerImage']
  }
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
  popularity: SearchResult['popularity']
  rank?: number | null
  scrollPosition: ScrollPosition
}

const mapStatus = (status: SearchResult['status']) =>
  status === 'RELEASING' ? 'Airing' : toStartCase(status)

const CardTable = memo(
  ({
    image,
    title,
    id,
    genres,
    meanScore,
    popularity,
    status,
    season,
    seasonYear,
    nextAiringEpisode,
    format,
    episodes,
    rank,
    scrollPosition,
  }: Props) => {
    const url = `/anime/${id}`
    const { color } = image.cover

    const _style = {
      '--color-text': adjustColor(color, 'var(--lightness)'),
      '--color-original': color,
      '--banner-image': `url(${image.banner})`,
    } as React.CSSProperties

    return (
      <article className={styles.wrapper} style={_style}>
        {rank && (
          <div className={styles.rank}>
            <div>
              <span className={styles.hash}>#</span>
              <span className={styles.number}>{rank}</span>
            </div>
          </div>
        )}
        <div className={styles.card}>
          <Link to={url} className={styles.imageWrapper}>
            <LazyLoadImage
              src={image.cover.large}
              alt={title.romaji}
              scrollPosition={scrollPosition}
              effect='opacity'
            />
          </Link>

          <div className={styles.content}>
            <div className={styles.title}>
              <Link to={url}>{title.romaji}</Link>
              <Genres
                as='section'
                genres={genres}
                color={color}
                canInteract={false}
                className={styles.genres}
              />
            </div>

            <div className={styles.review}>
              <FaceIcon meanScore={meanScore} />
              <div className={styles.score + ' ' + styles.row}>
                <div className={styles.percentage + ' ' + styles.row}>
                  {meanScore ? meanScore + '%' : ''}
                </div>
                <div className={styles.subRow}>
                  {meanScore && popularity !== 0 ? `${popularity} users` : ''}
                </div>
              </div>
            </div>

            <div className={styles.format + ' ' + styles.row}>
              {formatLabel(format)}
              <div className={styles.subRow}>
                {episodes && pluralize(episodes, 'episode')}
              </div>
            </div>

            <div className={styles.airingInfo + ' ' + styles.row}>
              {status === 'RELEASING' && seasonYear !== currentYear
                ? `Airing Since ${seasonYear}`
                : mapStatus(status)}
              <div className={styles.subRow}>
                {airingInfo({ nextAiringEpisode, season, seasonYear })}
              </div>
            </div>
          </div>
        </div>
      </article>
    )
  }
)

export default CardTable
