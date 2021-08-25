import classnames from 'classnames'
import { useContext } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { NO_IMAGE_URL } from '../../../api/queries'
import { StaffImage, StaffName } from '../../../generated/index'
import { context } from '../../../pages/media/Media'
import { toStartCase } from '../../../utils/toStartCase'
import styles from './Person.module.scss'

interface Props {
  image: StaffImage['large']
  name: StaffName['full']
  info: string | null | undefined
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
        src={image || NO_IMAGE_URL}
        alt={name || 'no info'}
        className={styles.image}
      />
      <div className={styles.details}>
        <div className={styles.name}>{name}</div>
        {info && <div className={styles.info}>{toStartCase(info)}</div>}
      </div>
    </div>
  )
}

export default Person
