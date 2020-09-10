import React, { useState, useRef } from 'react'
import _ from 'lodash'
import htmlParser from 'react-html-parser'
import { useSetRecoilState } from 'recoil'

import styles from './Card.module.scss'
import { filterStateAtom, initialFilterState } from '../../recoil/atoms'
import Image from '../Image/Image'
import FaceIcon from '../FaceIcon/FaceIcon'
import { trimText } from '../../helper'

interface Props {
  id: number
  image: string
  title: {
    native: string
    romaji: string
  }
  genres: string[]
  status: string
  nextAiring: {
    timeUntilAiring: number
    episode: number
  } | null
  meanScore: number
  description: string
}

const Card = ({
  image,
  title,
  genres,
  status,
  nextAiring,
  id,
  meanScore,
  description,
}: Props) => {
  const setFilterState = useSetRecoilState(filterStateAtom)
  // const [isHovered, setIsHovered] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  // const hoverHandler = useRef<number>()

  // const descriptionWithEllipse = trimText(description, 300)

  // const onMouseEnter = () => {
  //   hoverHandler.current = window.setTimeout(() => setIsHovered(true), 300)
  // }

  // const onMouseLeave = () => {
  //   window.clearTimeout(hoverHandler.current)
  //   setIsHovered(false)
  // }

  const handleSetGenre = (genre: string) => {
    setFilterState({
      ...initialFilterState,
      genres: [genre],
      sortBy: 'TRENDING_DESC',
    })
  }

  return (
    <article className={styles.wrapper}>
      <Image
        src={image}
        alt={title.romaji}
        className={styles[isLoaded ? 'loaded' : 'loading']}
        onLoad={() => setIsLoaded(true)}
      />

      <section className={styles.content}>
        <section className={styles.cardBody}>
          <div className={styles.scrollWrapper}>
            <header className={styles.cardHeader}>
              <div className={styles.title}>
                <h3 className={styles.romaji}>{title.romaji}</h3>
                <h4 className={styles.native}>{title.native}</h4>
              </div>
              <span className={styles.status}>
                {_.startCase(_.lowerCase(status))}
              </span>
              {meanScore && (
                <div className={styles.score}>
                  <FaceIcon meanScore={meanScore} />
                  {meanScore}%
                </div>
              )}
            </header>

            <p
              className={styles.description}
              // onMouseEnter={onMouseEnter}
              // onMouseLeave={onMouseLeave}
            >
              {/* {isHovered
            ? htmlParser(description)
            : htmlParser(descriptionWithEllipse)} */}
              {htmlParser(description)}
            </p>
          </div>
        </section>
        <footer className={styles.genres}>
          {_.uniq(genres).map(genre => (
            <div
              className={styles.genre}
              key={genre}
              onClick={() => handleSetGenre(genre)}>
              {genre}
            </div>
          ))}
        </footer>
      </section>
    </article>
  )
}

export default React.memo(Card)
