import React, { memo, useLayoutEffect, useMemo, useRef, useState } from 'react'

import styles from './Popover.module.scss'
import { FaceIcon } from '../FaceIcon/FaceIcon'
import { useWindowSizeStore, WindowSizeStore } from '../../../zustand/stores'
import {
  adjustColor,
  pluralize,
  convertTime,
  addKey,
  timeToArr,
} from '../../../helper'
import { Genre } from '../Genre/Genre'
import { SearchResult } from '../../../api/queries'
import { airingInfo, formatLabel } from '../../../helper'

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

type Position = {
  x: number
  width: number
}

const windowStateSelector = (state: WindowSizeStore) => state.width

export const Popover = memo(
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
    const [position, setPosition] = useState<Position | null>(null)
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const windowWidth = useWindowSizeStore(windowStateSelector)

    useLayoutEffect(() => {
      setPosition(() => {
        if (!wrapperRef.current) {
          return null
        }
        const rect = wrapperRef.current.getBoundingClientRect()
        const x = rect.x + wrapperRef.current.offsetLeft

        return {
          x,
          width: rect.width,
        }
      })
    }, [])

    const positionClass =
      position === null
        ? ''
        : position.x + position.width > windowWidth
        ? 'left'
        : 'right'

    const isHidden = position === null || !isVisible

    const _style = {
      '--color-light': adjustColor(color, 'var(--lightness)'),
    } as React.CSSProperties

    const _genres = useMemo(() => addKey(genres), [genres])

    const _duration = timeToArr(
      convertTime({
        num: duration,
        input: 'minutes',
        output: ['hours', 'minutes'],
      })
    ).slice(0, 2)

    return (
      <aside
        className={
          styles.wrapper +
          ' ' +
          styles[positionClass] +
          (isHidden ? ' ' + styles.hide : '')
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

        <footer className={styles.genres}>
          {_genres.slice(0, 3).map(g => (
            <Genre key={g.key} genre={g.value} color={color} />
          ))}
        </footer>
      </aside>
    )
  }
)
