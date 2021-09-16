import classnames from 'classnames'
import { memo } from 'react'
import { useOverflow } from '../../../../../hooks/useOverflow'
import { airingInfo } from '../../../../../utils/airingInfo'
import { convertTime } from '../../../../../utils/convertTIme'
import { formatLabel } from '../../../../../utils/formatLabel'
import { pluralize } from '../../../../../utils/pluralize'
import { timeToArr } from '../../../../../utils/timeToArr'
import { timeToStr } from '../../../../../utils/timeToStr'
import { Media } from '../../../CardGrid/CardGrid'
import Genres from '../../../Genres/Genres'
import Score from '../../../Score/Score'
import styles from './Popover.module.scss'

interface Props {
  index: number // for repositioning when order changes
  isVisible: boolean
  format: Media['format']
  season: Media['season']
  seasonYear: Media['seasonYear']
  episodes: Media['episodes']
  duration: Media['duration']
  genres: Media['genres']
  studios: Media['studios']
  meanScore: Media['meanScore']
  nextAiringEpisode: Media['nextAiringEpisode']
}

const Popover = ({
  nextAiringEpisode,
  isVisible,
  season,
  seasonYear,
  studios,
  meanScore,
  genres,
  format,
  episodes,
  duration,
}: Props) => {
  const { isLeft, isRight, wrapperRef } = useOverflow()

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
      {(nextAiringEpisode || season || seasonYear || meanScore) && (
        <header className={styles.header}>
          <div className={styles.airingInfo}>
            {airingInfo({ nextAiringEpisode, season, seasonYear })}
          </div>

          {meanScore && <Score score={meanScore} />}
        </header>
      )}

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
