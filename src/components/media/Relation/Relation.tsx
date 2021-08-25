import classnames from 'classnames'
import { useContext } from 'react'
import { DeepPartial } from 'react-hook-form'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { NO_IMAGE_URL } from '../../../api/queries'
import {
  MediaFormat,
  MediaRelation,
  MediaStatus,
} from '../../../generated/index'
import { useOverflow } from '../../../hooks/useOverflow'
import { context } from '../../../pages/media/Media'
import styles from './Relation.module.scss'

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

  return (
    <div
      className={classnames(styles.container, {
        [styles.collapsed]: isCollapsed,
      })}>
      <a href={`/`} className={styles.imageWrapper}>
        <LazyLoadImage
          src={image || NO_IMAGE_URL}
          alt={title || 'no image'}
          scrollPosition={scrollPosition}
          effect='opacity'
        />
        <div className={styles.label}>
          <span>{relationLabel || 'unknown'}</span>
        </div>
      </a>

      <div
        className={classnames(
          styles.content,
          styles[isLeft ? 'left' : 'right']
        )}
        ref={wrapperRef}>
        <div className={styles.relationType}>{relationLabel}</div>
        <h5 className={styles.title}>{title || 'no title'}</h5>
        <div className={styles.info}>
          <span className={styles.format}>{format}</span>
          {' - '}
          <span className={styles.status}>{status}</span>
        </div>
      </div>
    </div>
  )
}

export default Relation
