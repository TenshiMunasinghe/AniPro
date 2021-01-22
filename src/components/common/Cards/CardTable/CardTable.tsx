import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

import styles from './CardTable.module.scss'
import { SearchResult, currentYear } from '../../../../api/queries'
import { Image } from '../../Image/Image'
import { Genre } from '../../Genre/Genre'
import { FaceIcon } from '../../FaceIcon/FaceIcon'
import {
  toStartCase,
  airingInfo,
  adjustColor,
  pluralize,
} from '../../../../helper'
import { useIsImageLoaded } from '../../../../hooks/useIsImageLoaded'
import { addKey, formatLabel } from '../../../../helper'
import { useSetGenre } from '../../../../hooks/useSetGenre'

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
  rank: number | null
}

const mapStatus = (status: SearchResult['status']) =>
  status === 'RELEASING' ? 'Airing' : toStartCase(status)

export const CardTable = ({
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
  const { isImageLoaded, src } = useIsImageLoaded(image.extraLarge)

  const handleSetGenre = useSetGenre()

  const url = `/anime/${id}`

  const _style = {
    '--color-text': adjustColor(image.color, 'var(--lightness)'),
    '--color-original': image.color,
    '--image-url': `url(${src})`,
  } as React.CSSProperties

  const _genres = useMemo(() => addKey(genres), [genres])

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
            <div className={styles.genres}>
              {_genres.map(g => (
                <Genre
                  key={g.key}
                  genre={g.value}
                  onClick={() => handleSetGenre(g.value)}
                  color={image.color}
                />
              ))}
            </div>
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