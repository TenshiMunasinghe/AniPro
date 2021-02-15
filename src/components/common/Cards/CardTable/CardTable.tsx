import React, { memo } from 'react'
import { Link } from 'react-router-dom'

import styles from './CardTable.module.scss'
import { SearchResult } from '../../../../api/types'
import { currentYear } from '../../../../api/queries'
import { Image } from '../../Image/Image'
import { FaceIcon } from '../../FaceIcon/FaceIcon'
import { useIsImageLoaded } from '../../../../hooks/useIsImageLoaded'
import { toStartCase } from '../../../../utils/toStartCase'
import { adjustColor } from '../../../../utils/adjustColor'
import { formatLabel } from '../../../../utils/formatLabel'
import { pluralize } from '../../../../utils/pluralize'
import { airingInfo } from '../../../../utils/airingInfo'
import { Genres } from '../../Genres/Genres'

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
  popularity: SearchResult['popularity']
  rank?: number | null
}

const mapStatus = (status: SearchResult['status']) =>
  status === 'RELEASING' ? 'Airing' : toStartCase(status)

export const CardTable = memo(
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
  }: Props) => {
    const { isImageLoaded, src } = useIsImageLoaded(image.large)

    const url = `/anime/${id}`

    const _style = {
      '--color-text': adjustColor(image.color, 'var(--lightness)'),
      '--color-original': image.color,
      '--image-url': `url(${src})`,
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
            <Image
              className={styles[isImageLoaded ? 'loaded' : 'loading']}
              src={src}
              alt={title.romaji}
            />
          </Link>

          <div className={styles.content}>
            <div className={styles.title}>
              <Link to={url}>{title.romaji}</Link>
              <Genres
                as='section'
                genres={genres}
                color={image.color}
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
