import React, { useState, memo } from 'react'
import htmr from 'htmr'
import { Link } from 'react-router-dom'

import styles from './CardChart.module.scss'
import {
  useFilterStateStore,
  initialFilterState,
  FilterStateStore,
} from '../../zustand/stores'
import { Image } from '../Image/Image'
import { FaceIcon } from '../FaceIcon/FaceIcon'
import { imageSize, Media, GenreType } from '../../graphql/queries'
import { adjustColor } from '../../helper'
import { Genre } from '../Genre/Genre'

interface Props {
  id: number
  image: Media['coverImage']
  title: Media['title']
  genres: GenreType
  meanScore: Media['meanScore']
  description: Media['description']
}

const filterStateSelector = (state: FilterStateStore) => state.setFilterState

export const CardChart = memo(
  ({ id, image, title, genres, meanScore, description }: Props) => {
    const setFilterState = useFilterStateStore(filterStateSelector)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const handleSetGenre = (genre: string) => {
      setFilterState({
        ...initialFilterState,
        genres: [genre],
        sortBy: 'TRENDING_DESC',
      })
    }

    const pageUrl = `/anime/${id}`

    const _style = {
      '--color-light': adjustColor(image.color, 70),
      '--color-original': image.color,
    } as React.CSSProperties

    return (
      <article className={styles.wrapper} style={_style}>
        <Link
          to={pageUrl}
          aria-label={title.romaji}
          className={styles.imageWrapper}>
          <Image
            src={image[imageSize]}
            alt={title.romaji}
            className={styles[isLoaded ? 'loaded' : 'loading']}
            onLoad={() => setIsLoaded(true)}
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
                  styles.description + (isHovered ? ' ' + styles.active : '')
                }
                onMouseOver={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                {htmr(description)}
              </p>
            </div>
          </section>
          <footer className={styles.genres}>
            {genres.map(g => (
              <Genre
                key={g.key}
                genre={g.genre}
                onClick={() => handleSetGenre(g.genre)}
              />
            ))}
          </footer>
        </section>
      </article>
    )
  }
)
