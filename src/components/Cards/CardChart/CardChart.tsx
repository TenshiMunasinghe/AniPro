import React, { memo, useMemo } from 'react'
import htmr from 'htmr'
import { Link } from 'react-router-dom'

import styles from './CardChart.module.scss'
import {
  useFilterStateStore,
  initialFilterState,
  FilterStateStore,
} from '../../../zustand/stores'
import { Image } from '../../Image/Image'
import { FaceIcon } from '../../FaceIcon/FaceIcon'
import { SearchResult } from '../../../graphql/queries'
import { adjustColor, addKey } from '../../../helper'
import { Genre } from '../../Genre/Genre'
import { useIsImageLoaded } from '../../../hooks/useIsImageLoaded'

interface Props {
  id: number
  image: SearchResult['coverImage']
  title: SearchResult['title']
  genres: SearchResult['genres']
  meanScore: SearchResult['meanScore']
  description: SearchResult['description']
}

const filterStateSelector = (state: FilterStateStore) => state.setFilterState

export const CardChart = memo(
  ({ id, image, title, genres, meanScore, description }: Props) => {
    const setFilterState = useFilterStateStore(filterStateSelector)
    const { isImageLoaded, src } = useIsImageLoaded(image.extraLarge)

    const handleSetGenre = (genre: string) => {
      setFilterState({
        ...initialFilterState,
        genres: [genre],
        sortBy: 'TRENDING_DESC',
      })
    }

    const pageUrl = `/anime/${id}`

    const _style = {
      '--color-text': adjustColor(image.color, 'var(--lightness)'),
      '--color-original': image.color,
    } as React.CSSProperties

    const _genres = useMemo(() => addKey(genres), [genres])

    return (
      <article className={styles.wrapper} style={_style}>
        <Link
          to={pageUrl}
          aria-label={title.romaji}
          className={styles.imageWrapper}>
          <Image
            src={src}
            alt={title.romaji}
            className={styles[isImageLoaded ? 'loaded' : 'loading']}
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

              <div className={styles.description}>
                {description ? (
                  htmr(`<p>${description}</p>`)
                ) : (
                  <i>no description</i>
                )}
              </div>
            </div>
          </section>
          <footer className={styles.genres}>
            {_genres.map(g => (
              <Genre
                key={g.key}
                genre={g.value}
                onClick={() => handleSetGenre(g.value)}
                color={image.color}
              />
            ))}
          </footer>
        </section>
      </article>
    )
  }
)
