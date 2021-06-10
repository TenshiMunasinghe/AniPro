import htmr from 'htmr'
import { memo } from 'react'
import { FetchedMedias } from '../../../../api/types'
import { createColorVariable } from '../../../../utils/createColorVariable'
import CoverImage from '../components/CoverImage/CoverImage'
import Genres from '../components/Genres/Genres'
import Score from '../components/Score/Score'
import Title from '../components/Title/Title'
import styles from './CardChart.module.scss'

interface Props {
  id: number
  image: string
  color: string
  title: FetchedMedias['title']
  genres: FetchedMedias['genres']
  meanScore: FetchedMedias['meanScore']
  description: FetchedMedias['description']
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
  return (
    <article className={styles.wrapper} style={createColorVariable(color)}>
      <CoverImage id={id} src={image} color={color} title={title.romaji} />
      <section className={styles.content}>
        <section className={styles.cardBody}>
          <div className={styles.scrollWrapper}>
            <header className={styles.cardHeader}>
              <div className={styles.title}>
                <Title id={id} text={title.romaji} />
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
          canInteract={true}
          className={styles.genres}
        />
      </section>
    </article>
  )
}

export default memo(CardChart)
