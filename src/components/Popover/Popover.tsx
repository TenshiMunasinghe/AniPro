import React, { useLayoutEffect, useRef, useState } from 'react'

import styles from './Popover.module.scss'
import FaceIcon from '../FaceIcon/FaceIcon'
import { useWindowSizeStore, WindowSizeStore } from '../../zustand/stores'
import { convertFromSeconds, adjustColor } from '../../helper'

interface Props {
  isVisible: boolean
  format: string
  season?: string
  seasonYear?: number
  streamingEpisodes?: number
  duration?: number
  genres: string[]
  studio: string
  color: string
  meanScore: number
  nextAiringEpisode: {
    timeUntilAiring: number
    episode: number
  } | null
}

type Position = {
  x: number
  width: number
}

const windowStateSelector = (state: WindowSizeStore) => state.width

const Popover = ({
  nextAiringEpisode,
  isVisible,
  season,
  seasonYear,
  studio,
  color,
  meanScore,
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

  const classNameModifier =
    position === null || !isVisible
      ? 'hide'
      : position.x + position.width > windowWidth
      ? 'left'
      : 'right'

  // if(    position&& position.x + position.width > windowWidth
  //   ) classNameModifier = 'left'
  const airingInfo = nextAiringEpisode
    ? `Ep ${nextAiringEpisode.episode} airing in ${convertFromSeconds(
        nextAiringEpisode.timeUntilAiring
      )}`
    : `${season} ${seasonYear}`

  const _style = {
    '--color-text': adjustColor(color, 70),
  } as React.CSSProperties

  return (
    <aside
      className={styles.wrapper + ' ' + styles[classNameModifier]}
      ref={wrapperRef}
      style={_style}>
      <header className={styles.header}>
        <div className={styles.airingInfo}>{airingInfo}</div>
      </header>
      <section className={styles.info}>
        <div className={styles.studio}>{studio}</div>
        {meanScore && (
          <div className={styles.score}>
            <FaceIcon meanScore={meanScore} />
            {meanScore}%
          </div>
        )}
      </section>

      <footer className={styles.genres}></footer>
    </aside>
  )
}

export default Popover
