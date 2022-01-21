import classnames from 'classnames'
import { memo, useContext } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import { NO_IMAGE_URL } from '../../../api/queries'
import { linkToCharacterPage, linkToStaffPage } from '../../../App'
import { StaffImage, StaffName } from '../../../generated/index'
import { context } from '../../../pages/Media'
import { toStartCase } from '../../../utils/toStartCase'
import styles from './Person.module.scss'

interface Props {
  id?: number | null
  image: StaffImage['large']
  name: StaffName['full']
  info: string | null | undefined
  isReversed?: boolean
  type: 'Staff' | 'Character'
}

const Person = ({ id, image, name, info, type, isReversed = false }: Props) => {
  const { scrollPosition } = useContext(context)

  if (!id) return null

  const link = type === 'Staff' ? linkToStaffPage(id) : linkToCharacterPage(id)

  return (
    <div
      className={classnames(styles.container, {
        [styles.reversed]: isReversed,
      })}>
      <Link to={link}>
        <figure className={styles.imageWrapper}>
          <LazyLoadImage
            scrollPosition={scrollPosition}
            src={image || NO_IMAGE_URL}
            alt={name || 'no info'}
          />
        </figure>
      </Link>
      <div className={styles.details}>
        <Link to={link} className={styles.name}>
          {name}
        </Link>
        {info && <div className={styles.info}>{toStartCase(info)}</div>}
      </div>
    </div>
  )
}

export default memo(Person)
