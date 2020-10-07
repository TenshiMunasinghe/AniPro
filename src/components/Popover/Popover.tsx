import React, { useLayoutEffect, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil'

import styles from './Popover.module.scss'
import { windowSizeAtom } from '../../recoil/atoms'
import { convertFromSeconds } from '../../helper'

interface Props {
  isVisible: boolean
  format: string
  season?: string
  seasonYear?: number
  streamingEpisodes?: number
  duration?: number
  genres: string[]
  nextAiringEpisode: {
    timeUntilAiring: number
    episode: number
  } | null
}

type Position = {
  x: number
  width: number
}

const Popover = ({
  nextAiringEpisode,
  isVisible,
  season,
  seasonYear,
}: Props) => {
  const [position, setPosition] = useState<Position | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const { width: windowWidth } = useRecoilValue(windowSizeAtom)

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

  console.log(nextAiringEpisode)

  return (
    <aside
      className={styles.wrapper + ' ' + styles[classNameModifier]}
      ref={wrapperRef}>
      <header className={styles.header}>
        <div className={styles.airingInfo}>{airingInfo}</div>
      </header>
      <section className={styles.info}></section>

      <footer className={styles.genres}></footer>
    </aside>
  )
}

export default Popover
