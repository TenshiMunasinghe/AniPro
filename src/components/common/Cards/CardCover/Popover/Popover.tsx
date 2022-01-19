import classnames from 'classnames'
import { memo } from 'react'
import { DeepPartial } from 'react-hook-form'
import { Media } from '../../../../../generated'
import { useOverflow } from '../../../../../hooks/useOverflow'
import { airingInfo } from '../../../../../utils/airingInfo'
import { convertTime } from '../../../../../utils/convertTIme'
import { formatLabel } from '../../../../../utils/formatLabel'
import { pluralize } from '../../../../../utils/pluralize'
import { timeToArr } from '../../../../../utils/timeToArr'
import { timeToStr } from '../../../../../utils/timeToStr'
import Genres from '../../../Genres/Genres'
import Score from '../../../Score/Score'
import styles from './Popover.module.scss'

interface Props {
  index: number // for repositioning when order changes
  isVisible: boolean
  media: DeepPartial<Media>
}

const Popover = ({ isVisible, media }: Props) => {
  const { isLeft, isRight, wrapperRef } = useOverflow()

  if (!media.type) return null

  const {
    nextAiringEpisode,
    season,
    seasonYear,
    studios,
    meanScore,
    genres,
    format,
    episodes,
    duration,
    type,
    chapters,
    startDate,
    endDate,
  } = media

  const _duration = timeToArr(
    convertTime({
      num: duration || 0,
      input: 'minutes',
      output: ['hours', 'minutes'],
    })
  ).slice(0, 2)

  const isHidden = (!isLeft && !isRight) || !isVisible

  return (
    <aside
      className={classnames(styles.wrapper, styles[isLeft ? 'left' : 'right'], {
        [styles.hide]: isHidden,
      })}
      ref={wrapperRef}>
      {type === 'ANIME' && (
        <>
          {(nextAiringEpisode || season || seasonYear || meanScore) && (
            <header className={styles.header}>
              <div className={styles.airingInfo}>
                {airingInfo({ nextAiringEpisode, season, seasonYear })}
              </div>

              {meanScore && <Score score={meanScore} />}
            </header>
          )}
          <>
            {studios?.nodes?.[0]?.name && (
              <div className={styles.studio}>{studios?.nodes?.[0]?.name}</div>
            )}
            <div className={styles.info}>
              {formatLabel(format || '')}
              {format === 'MOVIE' && _duration.length > 0 ? (
                <>
                  <span className={styles.separator}>•</span>
                  {timeToStr(_duration)}
                </>
              ) : format !== 'MOVIE' && episodes ? (
                <>
                  <span className={styles.separator}>•</span>
                  {pluralize(episodes, 'Episode')}
                </>
              ) : (
                ''
              )}
            </div>
          </>
        </>
      )}

      {type === 'MANGA' && (
        <div className={styles.manga}>
          {meanScore && (
            <div className={styles.score}>
              <Score score={meanScore} />
            </div>
          )}
          {startDate?.year && (
            <div>
              {endDate?.year
                ? `${startDate.year} - ${endDate.year}`
                : `Publishing since ${startDate.year}`}
            </div>
          )}
          {chapters && <div>{pluralize(chapters, 'chapter')}</div>}
        </div>
      )}
      <Genres
        as='footer'
        genres={genres}
        canInteract={false}
        className={styles.genres}
      />
    </aside>
  )
}

export default memo(Popover)
