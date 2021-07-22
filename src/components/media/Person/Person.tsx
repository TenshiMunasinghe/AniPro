import classnames from 'classnames'
import { useContext } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { context } from '../../../pages/media/Media'
import { toStartCase } from '../../../utils/toStartCase'
import styles from './Person.module.scss'

interface Props {
  image: string
  name: string
  info: string
  isReversed?: boolean
}

const Person = ({ image, name, info, isReversed = false }: Props) => {
  const { scrollPosition } = useContext(context)
  return (
    <div
      className={classnames(styles.container, {
        [styles.reversed]: isReversed,
      })}>
      <LazyLoadImage
        scrollPosition={scrollPosition}
        src={image}
        alt={name}
        className={styles.image}
      />
      <div className={styles.details}>
        <div className={styles.name}>{name}</div>
        <div className={styles.info}>{toStartCase(info)}</div>
      </div>
    </div>
  )
}

export default Person
