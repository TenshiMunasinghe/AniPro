import { memo } from 'react'

import { currentYear } from '../../../../api/queries'
import { SearchResult } from '../../../../api/types'
import { airingInfo } from '../../../../utils/airingInfo'
import { formatLabel } from '../../../../utils/formatLabel'
import { pluralize } from '../../../../utils/pluralize'
import { toStartCase } from '../../../../utils/toStartCase'
import Genres from '../components/Genres/Genres'
import styles from './CardTable.module.scss'
import Title from '../components/Title/Title'
import CoverImage from '../components/CoverImage/CoverImage'
import Score from '../components/Score/Score'
import { createColorVariable } from '../../../../utils/createColorVariable'

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

const CardTable = ({
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
    ...createColorVariable(color),
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
            <Title id={id} text={title.romaji} />
            <Genres
              as='section'
              genres={genres}
              canInteract={false}
              className={styles.genres}
            />
          </div>

          <div className={styles.row}>
            {meanScore && <Score score={meanScore} />}
            <div className={styles.subRow}>
              {meanScore && popularity !== 0 ? `${popularity} users` : ''}
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

export default memo(CardTable)
