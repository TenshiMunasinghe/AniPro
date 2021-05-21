import htmr from 'htmr'
import React, { memo } from 'react'
import { LazyLoadImage, ScrollPosition } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'

import { SearchResult } from '../../../../api/types'
import { adjustColor } from '../../../../utils/adjustColor'
import FaceIcon from '../../FaceIcon/FaceIcon'
import Genres from '../components/Genres/Genres'
import styles from './CardChart.module.scss'
import { linkToMediaPage } from '../../../../App'

interface Props {
  id: number
  image: string
  color: string
  title: SearchResult['title']
  genres: SearchResult['genres']
  meanScore: SearchResult['meanScore']
  description: SearchResult['description']
  scrollPosition: ScrollPosition
}

const CardChart = memo(
  ({
    id,
    image,
    color,
    title,
    genres,
    meanScore,
    description,
    scrollPosition,
  }: Props) => {
    const _style = {
      '--color-text': adjustColor(color, 'var(--lightness)'),
      '--color-original': color,
    } as React.CSSProperties

    return (
      <article className={styles.wrapper} style={_style}>
        <Link
          to={linkToMediaPage(id)}
          aria-label={title.romaji}
          className={styles.imageWrapper}>
          <LazyLoadImage
            src={image}
            alt={title.romaji}
            scrollPosition={scrollPosition}
            effect='opacity'
          />
        </Link>

        <section className={styles.content}>
          <section className={styles.cardBody}>
            <div className={styles.scrollWrapper}>
              <header className={styles.cardHeader}>
                <div className={styles.title}>
                  <h3 className={styles.primaryTitle}>
                    <Link to={linkToMediaPage(id)}>{title.romaji}</Link>
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
            color={color}
            canInteract={true}
            className={styles.genres}
          />
        </section>
      </article>
    )
  }
)

export default CardChart
