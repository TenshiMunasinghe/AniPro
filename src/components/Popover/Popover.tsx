import React, { useLayoutEffect, useRef, useState } from 'react'

import styles from './Popover.module.scss'
import { FaceIcon } from '../FaceIcon/FaceIcon'
import { useWindowSizeStore, WindowSizeStore } from '../../zustand/stores'
import { adjustColor, pluralize, convertTime } from '../../helper'
import { Genre } from '../Genre/Genre'
import { SearchResult, GenreType } from '../../graphql/queries'
import { airingInfo } from '../../helper'

interface Props {
  isVisible: boolean
  format: SearchResult['format']
  season: SearchResult['season']
  seasonYear: SearchResult['seasonYear']
  episodes: SearchResult['episodes']
  duration: SearchResult['duration']
  genres: GenreType
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

export const Popover = ({
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
    '--color-light': adjustColor(color, 70),
  } as React.CSSProperties

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
        {format}
        {episodes ? (
          <>
            <span className={styles.separator}>•</span>
            {format === 'MOVIE'
              ? convertTime({
                  num: duration,
                  input: 'minutes',
                  output: ['hours', 'minutes'],
                })
              : pluralize(episodes, 'Episode')}
          </>
        ) : (
          ''
        )}
      </div>

      <footer className={styles.genres}>
        {genres.slice(0, 3).map(g => (
          <Genre key={g.key} genre={g.genre} />
        ))}
      </footer>
    </aside>
  )
}
