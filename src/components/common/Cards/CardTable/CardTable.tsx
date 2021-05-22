import { memo } from 'react'

import { currentYear } from '../../../../api/queries'
import { SearchResult } from '../../../../api/types'
import { adjustColor } from '../../../../utils/adjustColor'
import { airingInfo } from '../../../../utils/airingInfo'
import { formatLabel } from '../../../../utils/formatLabel'
import { pluralize } from '../../../../utils/pluralize'
import { toStartCase } from '../../../../utils/toStartCase'
import FaceIcon from '../../FaceIcon/FaceIcon'
import Genres from '../components/Genres/Genres'
import styles from './CardTable.module.scss'
import Title from '../components/Title/Title'
import CoverImage from '../components/CoverImage/CoverImage'

interface Props {
  id: number
  image: {
    cover: string
    banner: SearchResult['bannerImage']
  }
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
  popularity: SearchResult['popularity']
  rank?: number | null
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
    color,
  }: Props) => {
    const _style = {
      '--color-adjusted': adjustColor(color, 'var(--lightness)'),
      '--banner-image': `url(${image.banner})`,
    } as React.CSSProperties

    return (
      <article className={styles.wrapper} style={_style}>
        {rank && <div className={styles.rank}>#{rank}</div>}
        <div className={styles.card}>
          <CoverImage
            id={id}
            title={title.romaji}
            src={image.cover}
            color={color}
          />
          <div className={styles.content}>
            <div className={styles.header}>
              <Title id={id} text={title.romaji} color={color} />
              <Genres
                as='section'
                genres={genres}
                color={color}
                canInteract={false}
                className={styles.genres}
              />
            </div>

            <div className={styles.review}>
              <div className={styles.score + ' ' + styles.row}>
                <div className={styles.percentage + ' ' + styles.row}>
                  <FaceIcon meanScore={meanScore} />
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
