import { memo } from 'react'
import { DeepPartial } from 'react-hook-form'
import { currentYear, NO_IMAGE_URL } from '../../../../api/queries'
import { linkToMediaPage } from '../../../../App'
import { Media, MediaType } from '../../../../generated'
import { airingInfo } from '../../../../utils/airingInfo'
import { createColorVariable } from '../../../../utils/createColorVariable'
import { formatLabel } from '../../../../utils/formatLabel'
import { pluralize } from '../../../../utils/pluralize'
import { toStartCase } from '../../../../utils/toStartCase'
import { ImageSize } from '../../CardGrid/CardGrid'
import CoverImage from '../../CoverImage/CoverImage'
import Genres from '../../Genres/Genres'
import Score from '../../Score/Score'
import Title from '../../Title/Title'
import Rank from '../components/Rank/Rank'
import styles from './CardTable.module.scss'
import Info from './Info/Info'

interface Props {
  media: DeepPartial<Media>
  imageSize: ImageSize
  rank?: number | null
}

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
    type,
    chapters,
    startDate,
    endDate,
  },
  rank,
  imageSize,
}: Props) => {
  const _style = {
    ...createColorVariable(coverImage?.color || 'var(--color-foreground-200)'),
    '--banner-image': `url(${bannerImage})`,
  } as React.CSSProperties

  return (
    <article className={styles.container} style={_style}>
      {rank && (
        <div className={styles.rank}>
          <Rank rank={rank} />
        </div>
      )}
      <div className={styles.card}>
        <CoverImage
          link={linkToMediaPage(id, type || MediaType.Anime)}
          title={title?.romaji || 'no title'}
          src={coverImage?.[imageSize] || NO_IMAGE_URL}
        />
        <div className={styles.content}>
          <div className={styles.header}>
            <Title
              id={id}
              text={title?.romaji || 'no title'}
              type={type || null}
            />
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

          {type === MediaType.Anime && (
            <>
              <Info
                main={() => formatLabel(format || '')}
                sub={() => (episodes ? pluralize(episodes, 'episode') : null)}
              />

              <Info
                main={() =>
                  status === 'RELEASING' && seasonYear !== currentYear
                    ? `Airing Since ${seasonYear}`
                    : status === 'RELEASING'
                    ? 'Airing'
                    : toStartCase(status || '')
                }
                sub={() =>
                  airingInfo({ nextAiringEpisode, season, seasonYear })
                }
              />
            </>
          )}

          {type === MediaType.Manga && (
            <>
              <Info
                main={() => formatLabel(format || '')}
                sub={() => (chapters ? pluralize(chapters, 'chapter') : null)}
              />

              <Info
                main={() =>
                  status === 'RELEASING'
                    ? `Publishing`
                    : toStartCase(status || '')
                }
                sub={() =>
                  status === 'RELEASING'
                    ? `Since ${startDate?.year}`
                    : `From ${startDate?.year} to ${endDate?.year}`
                }
              />
            </>
          )}
        </div>
      </div>
    </article>
  )
}

export default memo(CardTable)
