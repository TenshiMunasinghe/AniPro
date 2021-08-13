import { memo, useContext } from 'react'
import { Media } from '../../../../api/types'
import { createColorVariable } from '../../../../utils/createColorVariable'
import { ImageSizeContext } from '../../CardGrid/CardGrid'
import CoverImage from '../../CoverImage/CoverImage'
import Description from '../../Description/Description'
import Genres from '../../Genres/Genres'
import Score from '../../Score/Score'
import Title from '../../Title/Title'
import styles from './CardChart.module.scss'

interface Props {
  media: Media
}

const CardChart = ({
  media: { id, title, coverImage, genres, meanScore, description },
}: Props) => {
  const imageSize = useContext(ImageSizeContext)

  return (
    <article
      className={styles.wrapper}
      style={createColorVariable(coverImage.color)}>
      <CoverImage id={id} src={coverImage[imageSize]} title={title.romaji} />
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

            <p className={styles.description} tabIndex={0}>
              <Description description={description} />
            </p>
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
