import { memo } from 'react'
import { DeepPartial } from 'react-hook-form'
import { NO_IMAGE_URL } from '../../../../api/queries'
import { linkToMediaPage } from '../../../../App'
import { Media, MediaType } from '../../../../generated'
import { createColorVariable } from '../../../../utils/createColorVariable'
import { ImageSize } from '../../CardGrid/CardGrid'
import CoverImage from '../../CoverImage/CoverImage'
import Description from '../../Description/Description'
import Genres from '../../Genres/Genres'
import Score from '../../Score/Score'
import Title from '../../Title/Title'
import styles from './CardChart.module.scss'

interface Props {
  media: DeepPartial<Media>
  imageSize: ImageSize
}

const CardChart = ({
  media: { id, title, coverImage, genres, meanScore, description, type },
  imageSize,
}: Props) => {
  return (
    <article
      className={styles.wrapper}
      style={createColorVariable(
        coverImage?.color || 'var(--color-foreground-200)'
      )}>
      <CoverImage
        link={linkToMediaPage(id, type || MediaType.Anime)}
        src={coverImage?.[imageSize] || NO_IMAGE_URL}
        title={title?.romaji || 'no image'}
      />
      <section className={styles.content}>
        <section className={styles.cardBody}>
          <div className={styles.scrollWrapper}>
            <header className={styles.cardHeader}>
              <div className={styles.title}>
                <Title
                  link={linkToMediaPage(id, type || MediaType.Anime)}
                  text={title?.romaji || 'no title'}
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
