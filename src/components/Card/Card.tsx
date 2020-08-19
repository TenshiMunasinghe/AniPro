import React, { useState, useRef } from 'react'
import _ from 'lodash'
import htmlParser from 'react-html-parser'
import { useSetRecoilState } from 'recoil'

import styles from './Card.module.scss'
import { filterStateAtom, initialFilterState } from '../../recoil/atoms'

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
  description: string
}

const Card = ({
  image,
  title,
  genres,
  status,
  nextAiring,
  id,
  description,
}: Props) => {
  const setFilterState = useSetRecoilState(filterStateAtom)
  const [isHovered, setIsHovered] = useState(false)
  const hoverHandler = useRef<number>()
  const descriptionWithEllipse =
    description && description.length > 300
      ? description.substring(0, 297) + '...'
      : description

  const onMouseEnter = () => {
    hoverHandler.current = window.setTimeout(() => setIsHovered(true), 300)
  }

  const onMouseLeave = () => {
    window.clearTimeout(hoverHandler.current)
    setIsHovered(false)
  }

  const handleSetGenre = (genre: string) => {
    setFilterState({ ...initialFilterState, genres: [genre] })
  }

  return (
    <div className={styles.wrapper}>
      <img src={image} alt={title.romaji} className={styles.image} />

      <div className={styles.cardBody}>
        <div>
          <h3 className={styles.heading}>
            {title.romaji}
            <span className={styles.status}>
              - {_.startCase(_.lowerCase(status))}
            </span>
          </h3>
          <h4 className={styles.secondaryTitle}>{title.native}</h4>
        </div>

        <div className={styles.genres}>
          {_.uniq(genres).map(genre => (
            <div
              className={styles.genre}
              key={genre}
              onClick={() => handleSetGenre(genre)}>
              {genre}
            </div>
          ))}
        </div>

        <p
          className={styles.description}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}>
          {isHovered
            ? htmlParser(description)
            : htmlParser(descriptionWithEllipse)}
        </p>
      </div>
    </div>
  )
}

export default React.memo(Card)
