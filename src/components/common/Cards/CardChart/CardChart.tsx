import React, { memo } from 'react'
import htmr from 'htmr'
import { Link } from 'react-router-dom'

import styles from './CardChart.module.scss'
import { Image } from '../../Image/Image'
import { FaceIcon } from '../../FaceIcon/FaceIcon'
import { SearchResult } from '../../../../api/types'
import { useIsImageLoaded } from '../../../../hooks/useIsImageLoaded'
import { adjustColor } from '../../../../utils/adjustColor'
import { Genres } from '../../Genres/Genres'

interface Props {
  id: number
  image: SearchResult['coverImage']
  title: SearchResult['title']
  genres: SearchResult['genres']
  meanScore: SearchResult['meanScore']
  description: SearchResult['description']
}

export const CardChart = memo(
  ({ id, image, title, genres, meanScore, description }: Props) => {
    const { isImageLoaded, src } = useIsImageLoaded(image.large)

    const pageUrl = `/anime/${id}`

    const _style = {
      '--color-text': adjustColor(image.color, 'var(--lightness)'),
      '--color-original': image.color,
    } as React.CSSProperties

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

              <div className={styles.description} tabIndex={0}>
                {description ? (
                  htmr(`<p>${description}</p>`)
                ) : (
                  <i>no description</i>
                )}
              </div>
            </div>
          </section>
          <Genres
            as='footer'
            genres={genres}
            color={image.color}
            canInteract={false}
            className={styles.genres}
          />
        </section>
      </article>
    )
  }
)
