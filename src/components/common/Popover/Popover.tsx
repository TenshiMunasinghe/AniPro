import React, { memo, useLayoutEffect, useRef, useState } from 'react'

import styles from './Popover.module.scss'
import { useWindowSizeStore, WindowSizeStore } from '../../../zustand/stores'
import { SearchResult } from '../../../api/types'
import { adjustColor } from '../../../utils/adjustColor'
import { timeToArr } from '../../../utils/timeToArr'
import { convertTime } from '../../../utils/convertTIme'
import { airingInfo } from '../../../utils/airingInfo'
import { formatLabel } from '../../../utils/formatLabel'
import { pluralize } from '../../../utils/pluralize'
import FaceIcon from '../FaceIcon/FaceIcon'
import Genres from '../Genres/Genres'

interface Props {
  isVisible: boolean
  format: SearchResult['format']
  season: SearchResult['season']
  seasonYear: SearchResult['seasonYear']
  episodes: SearchResult['episodes']
  duration: SearchResult['duration']
  genres: SearchResult['genres']
  studios: SearchResult['studios']
  color: SearchResult['coverImage']['color']
  meanScore: SearchResult['meanScore']
  nextAiringEpisode: SearchResult['nextAiringEpisode']
}

type DisplayState = {
  isLeft: boolean
  isRight: boolean
}

const windowStateSelector = (state: WindowSizeStore) => state.width

const Popover = memo(
  ({
    nextAiringEpisode,
    isVisible,
    season,
    seasonYear,
    studios,
    color,
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
        if (!wrapperRef.current || !wrapperRef.current.parentElement)
          return prev

        const rect = wrapperRef.current.getBoundingClientRect()
        const parentRect = wrapperRef.current.parentElement.getBoundingClientRect()
        const { offsetLeft } = wrapperRef.current

        const isRight =
          (offsetLeft > 0 && rect.right < windowWidth * 0.9) ||
          (offsetLeft < 0 && parentRect.right - offsetLeft < windowWidth * 0.9)
        const isLeft =
          !isRight &&
          ((offsetLeft > 0 &&
            parentRect.left > rect.right - parentRect.right) ||
            (offsetLeft < 0 && rect.left > 0))

        return { isLeft, isRight }
      })
    }, [windowWidth])

    const _style = {
      '--color-light': adjustColor(color, 'var(--lightness)'),
    } as React.CSSProperties

    const _duration = timeToArr(
      convertTime({
        num: duration,
        input: 'minutes',
        output: ['hours', 'minutes'],
      })
    ).slice(0, 2)

    const isHidden = (!isLeft && !isRight) || !isVisible

    const className = isLeft ? 'left' : 'right'

    return (
      <aside
        className={
          styles.wrapper +
          ' ' +
          styles[className] +
          (isHidden ? ` ${styles.hide}` : '')
        }
        ref={wrapperRef}
        style={_style}>
        <header className={styles.header}>
          <div className={styles.airingInfo}>
            {airingInfo({ nextAiringEpisode, season, seasonYear })}
          </div>
          {meanScore && (
            <div className={styles.score}>
              <FaceIcon meanScore={meanScore} />
              {meanScore}%
            </div>
          )}
        </header>

        <div className={styles.studio}>{studios.nodes[0]?.name}</div>
        <div className={styles.info}>
          {formatLabel(format)}
          {format === 'MOVIE' && _duration.length > 0 ? (
            <>
              <span className={styles.separator}>•</span>
              {
                //eg: outputs 1 hour 20 minutes
                _duration
                  .map(val => (val ? `${val.num} ${val.unit}` : ''))
                  .filter(str => str !== '')
                  .join(' ')
              }
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
          color={color}
          canInteract={false}
          className={styles.genres}
        />
      </aside>
    )
  }
)

export default Popover
