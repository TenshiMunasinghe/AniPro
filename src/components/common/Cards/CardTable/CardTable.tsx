import { memo, useContext } from 'react'
import { currentYear, NO_IMAGE_URL } from '../../../../api/queries'
import { airingInfo } from '../../../../utils/airingInfo'
import { createColorVariable } from '../../../../utils/createColorVariable'
import { formatLabel } from '../../../../utils/formatLabel'
import { pluralize } from '../../../../utils/pluralize'
import { toStartCase } from '../../../../utils/toStartCase'
import { ImageSizeContext, Media } from '../../CardGrid/CardGrid'
import CoverImage from '../../CoverImage/CoverImage'
import Genres from '../../Genres/Genres'
import Score from '../../Score/Score'
import Title from '../../Title/Title'
import Rank from '../components/Rank/Rank'
import styles from './CardTable.module.scss'
import Info from './Info/Info'
interface Props {
  media: Media
  rank?: number | null
}

const mapStatus = (status: Media['status']) =>
  status === 'RELEASING' ? 'Airing' : toStartCase(status || '')

const CardTable = ({
  media: {
    title,
    id,
    coverImage,
    bannerImage,
    genres,
    meanScore,
    popularity,
    status,
    season,
    seasonYear,
    nextAiringEpisode,
    format,
    episodes,
  },
  rank,
}: Props) => {
  const imageSize = useContext(ImageSizeContext)

  const _style = {
    ...createColorVariable(coverImage?.color || 'var(--color-foreground-200)'),
    '--banner-image': `url(${bannerImage})`,
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
          title={title?.romaji || 'no title'}
          src={coverImage?.[imageSize] || NO_IMAGE_URL}
        />
        <div className={styles.content}>
          <div className={styles.header}>
            <Title id={id} text={title?.romaji || 'no title'} />
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
            main={() => formatLabel(format || '')}
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
