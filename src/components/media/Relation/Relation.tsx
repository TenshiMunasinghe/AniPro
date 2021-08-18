import classnames from 'classnames'
import { useContext } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useOverflow } from '../../../hooks/useOverflow'
import { context } from '../../../pages/media/Media'
import styles from './Relation.module.scss'

interface Props {
  id: number
  image: string
  relation: string
  title: string
  format: string
  status: string
  isCollapsed: boolean
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

  const relationLabel = relation.replace('_', ' ').toLowerCase()

  return (
    <div
      className={classnames(styles.container, {
        [styles.collapsed]: isCollapsed,
      })}>
      <a href={`/`} className={styles.imageWrapper}>
        <LazyLoadImage
          src={image}
          alt={title}
          scrollPosition={scrollPosition}
          effect='opacity'
        />
        <div className={styles.label}>
          <span>{relationLabel}</span>
        </div>
      </a>

      <div
        className={classnames(
          styles.content,
          styles[isLeft ? 'left' : 'right']
        )}
        ref={wrapperRef}>
        <div className={styles.relationType}>{relationLabel}</div>
        <h5 className={styles.title}>{title}</h5>
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
