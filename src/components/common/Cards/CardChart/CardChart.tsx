import { memo, useContext } from 'react'
import { NO_IMAGE_URL } from '../../../../api/queries'
import { createColorVariable } from '../../../../utils/createColorVariable'
import { ImageSizeContext, Media } from '../../CardGrid/CardGrid'
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
  media: { id, title, coverImage, genres, meanScore, description, type },
}: Props) => {
  const imageSize = useContext(ImageSizeContext)

  return (
    <article
      className={styles.wrapper}
      style={createColorVariable(
        coverImage?.color || 'var(--color-foreground-200)'
      )}>
      <CoverImage
        id={id}
        src={coverImage?.[imageSize] || NO_IMAGE_URL}
        title={title?.romaji || 'no image'}
        type={type || null}
      />
      <section className={styles.content}>
        <section className={styles.cardBody}>
          <div className={styles.scrollWrapper}>
            <header className={styles.cardHeader}>
              <div className={styles.title}>
                <Title
                  id={id}
                  text={title?.romaji || 'no title'}
                  type={type || null}
                />
                <h4 className={styles.secondaryTitle}>
                  {title?.english || title?.romaji || 'no title'}
                </h4>
              </div>
              {meanScore && <Score score={meanScore} />}
            </header>

            <p className={styles.description} tabIndex={0}>
              <Description description={description} />
            </p>
          </div>
        </section>
        <Genres
          as='footer'
          genres={genres}
          canInteract
          className={styles.genres}
        />
      </section>
    </article>
  )
}

export default memo(CardChart)
