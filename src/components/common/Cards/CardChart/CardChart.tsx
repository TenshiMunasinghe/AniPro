import htmr from 'htmr';
import React, { memo } from 'react';
import { LazyLoadImage, ScrollPosition } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

import { SearchResult } from '../../../../api/types';
import { adjustColor } from '../../../../utils/adjustColor';
import FaceIcon from '../../FaceIcon/FaceIcon';
import Genres from '../../Genres/Genres';
import styles from './CardChart.module.scss';

interface Props {
  id: number
  image: SearchResult['coverImage']
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
    title,
    genres,
    meanScore,
    description,
    scrollPosition,
  }: Props) => {
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
          <LazyLoadImage
            src={image.large}
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
            canInteract={true}
            className={styles.genres}
          />
        </section>
      </article>
    )
  }
)

export default CardChart
