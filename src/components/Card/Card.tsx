import React, { RefObject, useState, useMemo } from 'react'
import uniq from 'lodash/uniq'
import htmlParser from 'react-html-parser'
import { useSetRecoilState } from 'recoil'
import { Link } from 'react-router-dom'
import { v4 } from 'uuid'

import styles from './Card.module.scss'
import { filterStateAtom, initialFilterState } from '../../recoil/atoms'
import Image from '../Image/Image'
import FaceIcon from '../FaceIcon/FaceIcon'
import { imageSize } from '../../graphql/queries'
import useClickedOutside from '../../hooks/useClickedOutside'

interface Props {
  id: number
  image: {
    [key: string]: string
    color: string
  }
  title: {
    romaji: string
    english: string
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
  const [isLoaded, setIsLoaded] = useState(false)

  const { ref, isClickedOut, handleFocus, handleBlur } = useClickedOutside()

  const cards = useMemo(
    () => uniq(genres).map(g => ({ genre: g, key: v4() })),
    [genres]
  )

  const handleSetGenre = (genre: string) => {
    console.log('y')

    setFilterState({
      ...initialFilterState,
      genres: [genre],
      sortBy: 'TRENDING_DESC',
    })
  }

  const handleImageLoad = () => setIsLoaded(true)

  const pageUrl = `/anime/${id}`

  return (
    <article className={styles.wrapper}>
      <Link
        to={pageUrl}
        style={{ background: image.color }}
        aria-label={title.romaji}>
        <Image
          src={image[imageSize]}
          alt={title.romaji}
          className={styles[isLoaded ? 'loaded' : 'loading']}
          onLoad={handleImageLoad}
        />
      </Link>

      <section className={styles.content}>
        <section className={styles.cardBody}>
          <div className={styles.scrollWrapper}>
            <header className={styles.cardHeader}>
              <div className={styles.title}>
                <h3 className={styles.primaryTitle}>
                  <Link to={pageUrl}>{title.romaji}</Link>
                </h3>
                <h4 className={styles.secondaryTitle}>
                  {title.english || title.romaji}
                </h4>
              </div>
              {meanScore && (
                <div className={styles.score}>
                  <FaceIcon meanScore={meanScore} />
                  {meanScore}%
                </div>
              )}
            </header>

            <p
              className={
                styles.description + (isClickedOut ? '' : ' ' + styles.active)
              }
              ref={ref as RefObject<HTMLParagraphElement>}
              onMouseEnter={handleFocus}
              onMouseLeave={handleBlur}>
              {htmlParser(description)}
            </p>
          </div>
        </section>
        <footer className={styles.genres}>
          {cards.map(g => (
            <button
              key={g.key}
              className={styles.genre}
              onClick={() => handleSetGenre(g.genre)}>
              {g.genre}
            </button>
          ))}
        </footer>
      </section>
    </article>
  )
}

export default React.memo(Card)
