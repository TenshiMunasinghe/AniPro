import classnames from 'classnames'
import { memo, useLayoutEffect, useRef, useState } from 'react'
import { FetchedMedias } from '../../../../../api/types'
import { airingInfo } from '../../../../../utils/airingInfo'
import { convertTime } from '../../../../../utils/convertTIme'
import { formatLabel } from '../../../../../utils/formatLabel'
import { pluralize } from '../../../../../utils/pluralize'
import { timeToArr } from '../../../../../utils/timeToArr'
import { timeToStr } from '../../../../../utils/timeToStr'
import {
  useWindowSizeStore,
  WindowSizeStore,
} from '../../../../../zustand/stores'
import Genres from '../../../Genres/Genres'
import Score from '../../../Score/Score'
import styles from './Popover.module.scss'

interface Props {
  index: number
  isVisible: boolean
  format: FetchedMedias['format']
  season: FetchedMedias['season']
  seasonYear: FetchedMedias['seasonYear']
  episodes: FetchedMedias['episodes']
  duration: FetchedMedias['duration']
  genres: FetchedMedias['genres']
  studios: FetchedMedias['studios']
  meanScore: FetchedMedias['meanScore']
  nextAiringEpisode: FetchedMedias['nextAiringEpisode']
}

type DisplayState = {
  isLeft: boolean
  isRight: boolean
}

const windowStateSelector = (state: WindowSizeStore) => state.width

const Popover = ({
  index,
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
  const [{ isLeft, isRight }, setDisplay] = useState<DisplayState>({
    isLeft: false,
    isRight: false,
  })
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const windowWidth = useWindowSizeStore(windowStateSelector)

  useLayoutEffect(() => {
    setDisplay(prev => {
      if (!wrapperRef.current || !wrapperRef.current.parentElement) return prev

      const rect = wrapperRef.current.getBoundingClientRect()
      const parentRect = wrapperRef.current.parentElement.getBoundingClientRect()
      const { offsetLeft } = wrapperRef.current

      const isRight =
        (offsetLeft > 0 && rect.right < windowWidth * 0.9) ||
        (offsetLeft < 0 && parentRect.right - offsetLeft < windowWidth * 0.9)
      const isLeft =
        !isRight &&
        ((offsetLeft > 0 && parentRect.left > rect.right - parentRect.right) ||
          (offsetLeft < 0 && rect.left > 0))

      return { isLeft, isRight }
    })
  }, [windowWidth, index])

  const _duration = timeToArr(
    convertTime({
      num: duration,
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
      <header className={styles.header}>
        <div className={styles.airingInfo}>
          {airingInfo({ nextAiringEpisode, season, seasonYear })}
        </div>
        {meanScore && <Score score={meanScore} />}
      </header>

      <div className={styles.studio}>{studios.nodes[0]?.name}</div>
      <div className={styles.info}>
        {formatLabel(format)}
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
