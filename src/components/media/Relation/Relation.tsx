import { useContext } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { context } from '../../../pages/media/Media'
import styles from './Relation.module.scss'

interface Props {
  id: number
  image: string
  relation: string
  title: string
  format: string
  status: string
}

const Relation = ({ id, image, relation, title, format, status }: Props) => {
  const { scrollPosition } = useContext(context)
  return (
    <div className={styles.wrapper}>
      <a href={`/`} className={styles.imageWrapper}>
        <LazyLoadImage
          src={image}
          alt={title}
          scrollPosition={scrollPosition}
          effect='opacity'
        />
      </a>

      <div className={styles.content}>
        <div className={styles.relationType}>{relation}</div>
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
