import { memo } from 'react'
import { currentYear } from '../../../../api/queries'
import { FetchedMedias } from '../../../../api/types'
import { airingInfo } from '../../../../utils/airingInfo'
import { createColorVariable } from '../../../../utils/createColorVariable'
import { formatLabel } from '../../../../utils/formatLabel'
import { pluralize } from '../../../../utils/pluralize'
import { toStartCase } from '../../../../utils/toStartCase'
import CoverImage from '../components/CoverImage/CoverImage'
import Genres from '../components/Genres/Genres'
import Rank from '../components/Rank/Rank'
import Score from '../components/Score/Score'
import Title from '../components/Title/Title'
import styles from './CardTable.module.scss'
import Info from './Info/Info'

interface Props {
  id: number
  image: {
    cover: string
    banner: FetchedMedias['bannerImage']
  }
  color: string
  title: FetchedMedias['title']
  format: FetchedMedias['format']
  season: FetchedMedias['season']
  seasonYear: FetchedMedias['seasonYear']
  episodes: FetchedMedias['episodes']
  duration: FetchedMedias['duration']
  genres: FetchedMedias['genres']
  status: FetchedMedias['status']
  studios: FetchedMedias['studios']
  meanScore: FetchedMedias['meanScore']
  nextAiringEpisode: FetchedMedias['nextAiringEpisode']
  popularity: FetchedMedias['popularity']
  rank?: number | null
}

const mapStatus = (status: FetchedMedias['status']) =>
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
      {rank && (
        <div className={styles.rank}>
          <Rank rank={rank} />
        </div>
      )}
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

          <Info
            main={() => (meanScore ? <Score score={meanScore} /> : null)}
            sub={() =>
              meanScore && popularity !== 0 ? `${popularity} users` : null
            }
          />

          <Info
            main={() => formatLabel(format)}
            sub={() => (episodes ? pluralize(episodes, 'episode') : null)}
          />

          <Info
            main={() =>
              status === 'RELEASING' && seasonYear !== currentYear
                ? `Airing Since ${seasonYear}`
                : mapStatus(status)
            }
            sub={() => airingInfo({ nextAiringEpisode, season, seasonYear })}
          />
        </div>
      </div>
    </article>
  )
}

export default memo(CardTable)
