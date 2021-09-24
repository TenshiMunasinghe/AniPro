import { CSSProperties, forwardRef } from 'react'
import { NO_IMAGE_URL } from '../../../api/queries'
import { adjustColor } from '../../../utils/adjustColor'
import { createColorVariable } from '../../../utils/createColorVariable'
import { Media } from '../../common/CardGrid/CardGrid'
import CoverImage from '../../common/CoverImage/CoverImage'
import Description from '../../common/Description/Description'
import Genres from '../../common/Genres/Genres'
import Title from '../../common/Title/Title'
import styles from './Slide.module.scss'

interface Props {
  media?: Media | null
}

const Slide = forwardRef<HTMLDivElement, Props>(({ media }, ref) => {
  if (!media) return null

  const style = {
    '--cover-image': `url(${media?.coverImage?.extraLarge || NO_IMAGE_URL})`,
    ...createColorVariable(
      media?.coverImage?.color || 'var(--color-foreground-200)'
    ),
    '--color-adjusted': adjustColor(
      media?.coverImage?.color || 'var(--color-foreground-200)',
      '85%'
    ),
  } as CSSProperties

  return (
    <div className={styles.container} style={style} ref={ref}>
      <div className={styles.coverImage} />
      <div className={styles.content}>
        <div>
          <Title id={media.id} text={media?.title?.romaji || 'no title'} />
          <div className={styles.description}>
            <Description description={media.description} />
          </div>
        </div>
        <div className={styles.image}>
          <CoverImage
            id={media.id}
            title={media?.title?.romaji || 'no title'}
            src={media?.coverImage?.extraLarge || NO_IMAGE_URL}
          />
        </div>
      </div>
      <Genres as='section' genres={media.genres} canInteract />
    </div>
  )
})

export default Slide
