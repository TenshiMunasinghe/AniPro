import classnames from 'classnames'
import { useContext } from 'react'
import { DeepPartial } from 'react-hook-form'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import { NO_IMAGE_URL } from '../../../api/queries'
import { linkToMediaPage } from '../../../App'
import {
  MediaFormat,
  MediaRelation,
  MediaStatus,
} from '../../../generated/index'
import { useOverflow } from '../../../hooks/useOverflow'
import { context } from '../../../pages/media/Media'
import styles from './Relation.module.scss'

// const UNSUPPORTED_FORMAT: (MediaFormat | undefined | null)[] = [
//   MediaFormat.Novel,
//   MediaFormat.Manga,
//   MediaFormat.Music,
// ]

interface Props {
  id?: number
  image?: string | null
  relation?: DeepPartial<MediaRelation> | null
  title?: string | null
  format?: DeepPartial<MediaFormat> | null
  status?: DeepPartial<MediaStatus> | null
  isCollapsed?: boolean
}

const Relation = ({
  id,
  image,
  relation,
  title,
  format,
  status,
  isCollapsed,
}: Props) => {
  const { scrollPosition } = useContext(context)
  const { isLeft, wrapperRef } = useOverflow()

  const relationLabel = relation?.replace('_', ' ').toLowerCase()

  const linkUrl = id ? linkToMediaPage(id) : '#'

  return (
    <div
      className={classnames(styles.container, {
        [styles.collapsed]: isCollapsed,
      })}>
      <Link to={linkUrl} className={styles.imageWrapper}>
        <LazyLoadImage
          src={image || NO_IMAGE_URL}
          alt={title || 'no image'}
          scrollPosition={scrollPosition}
          effect='opacity'
        />
        <div className={styles.label}>
          <span>{relationLabel || 'unknown'}</span>
        </div>
      </Link>

      <div
        className={classnames(
          styles.content,
          styles[isLeft ? 'left' : 'right']
        )}
        ref={wrapperRef}>
        <div className={styles.relationType}>{relationLabel}</div>
        <h5 className={styles.title}>
          <Link to={linkUrl}>{title || 'no title'}</Link>
        </h5>
        <div className={styles.info}>
          <span className={styles.format}>{format?.toLowerCase()}</span>
          {' - '}
          <span className={styles.status}>{status?.toLowerCase()}</span>
        </div>
      </div>
    </div>
  )
}

export default Relation
