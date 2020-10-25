import React, { useLayoutEffect, useRef, useState } from 'react'

import styles from './Popover.module.scss'
import { FaceIcon } from '../FaceIcon/FaceIcon'
import { useWindowSizeStore, WindowSizeStore } from '../../zustand/stores'
import {
  convertFromSeconds,
  adjustColor,
  pluralize,
  toStartCase,
} from '../../helper'
import { Genre } from '../Genre/Genre'
import { Media, GenreType } from '../../graphql/queries'
import { airingInfo } from '../../helper'

interface Props {
  isVisible: boolean
  format: Media['format']
  season: Media['season']
  seasonYear: Media['seasonYear']
  episodes: Media['episodes']
  duration: Media['duration']
  genres: GenreType
  studios: Media['studios']
  color: Media['coverImage']['color']
  meanScore: Media['meanScore']
  nextAiringEpisode: Media['nextAiringEpisode']
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
            {pluralize(episodes, 'Episode')}
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
