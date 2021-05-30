import htmr from 'htmr'
import { memo } from 'react'

import { SearchResult } from '../../../../api/types'
import { adjustColor } from '../../../../utils/adjustColor'
import Genres from '../components/Genres/Genres'
import styles from './CardChart.module.scss'
import Title from '../components/Title/Title'
import CoverImage from '../components/CoverImage/CoverImage'
import Score from '../components/Score/Score'

interface Props {
  id: number
  image: string
  color: string
  title: SearchResult['title']
  genres: SearchResult['genres']
  meanScore: SearchResult['meanScore']
  description: SearchResult['description']
}

const CardChart = ({
  id,
  image,
  color,
  title,
  genres,
  meanScore,
  description,
}: Props) => {
  const _style = {
    '--color-text': adjustColor(color, 'var(--lightness)'),
    '--color-original': color,
  } as React.CSSProperties

  return (
    <article className={styles.wrapper} style={_style}>
      <CoverImage id={id} src={image} color={color} title={title.romaji} />
      <section className={styles.content}>
        <section className={styles.cardBody}>
          <div className={styles.scrollWrapper}>
            <header className={styles.cardHeader}>
              <div className={styles.title}>
                <Title id={id} text={title.romaji} color={color} />
                <h4 className={styles.secondaryTitle}>
                  {title.english || title.romaji}
                </h4>
              </div>
              {meanScore && (
                <div className={styles.score}>
                  <Score score={meanScore} />
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

export default memo(CardChart)
