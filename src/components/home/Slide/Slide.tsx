import { CSSProperties, forwardRef, memo, useCallback } from 'react'
import { DeepPartial } from 'react-hook-form'
import { NO_IMAGE_URL } from '../../../api/queries'
import { Media } from '../../../generated'
import { adjustColor } from '../../../utils/adjustColor'
import { createColorVariable } from '../../../utils/createColorVariable'
import CoverImage from '../../common/CoverImage/CoverImage'
import Description from '../../common/Description/Description'
import Genres from '../../common/Genres/Genres'
import Title from '../../common/Title/Title'
import styles from './Slide.module.scss'

interface Props {
  media?: DeepPartial<Media> | null
  index: number
  setSlide: (slide: number) => void
}

const Slide = forwardRef<HTMLDivElement[], Props>(
  ({ media, setSlide, index }, ref) => {
    const onFocus = useCallback(
      e => {
        if (!e.currentTarget.contains(e.relatedTarget?.parentNode))
          setSlide(index)
      },
      [setSlide, index]
    )

    if (!media?.id || !ref) return null

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
      <div
        className={styles.container}
        style={style}
        ref={el =>
          typeof ref !== 'function' && el && ref.current
            ? (ref.current[index] = el)
            : null
        }
        tabIndex={0}
        onFocus={onFocus}>
        <div className={styles.coverImage} />
        <div className={styles.content}>
          <div>
            <Title
              id={media.id}
              text={media?.title?.romaji || 'no title'}
              type={media.type || null}
            />
            <div className={styles.description}>
              <Description description={media.description} />
            </div>
          </div>
          <div className={styles.image}>
            <CoverImage
              id={media.id}
              title={media?.title?.romaji || 'no title'}
              src={media?.coverImage?.extraLarge || NO_IMAGE_URL}
              type={media.type || null}
            />
          </div>
        </div>
        <Genres as='section' genres={media.genres} canInteract />
      </div>
    )
  }
)

export default memo(Slide)
