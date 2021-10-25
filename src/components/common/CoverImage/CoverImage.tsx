import { useContext } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, useLocation } from 'react-router-dom'
import { NO_IMAGE_URL } from '../../../api/queries'
import { ScrollPositionContext } from '../CardGrid/CardGrid'
import styles from './CoverImage.module.scss'

interface Props {
  link?: string
  title?: string | null
  src?: string | null
}

const CoverImage = ({ link, title, src }: Props) => {
  const scrollPosition = useContext(ScrollPositionContext)
  const { pathname, search } = useLocation()

  return (
    <Link
      to={link || pathname + search}
      aria-label={title || 'no title'}
      className={styles.wrapper}>
      <LazyLoadImage
        src={src || NO_IMAGE_URL}
        alt={title || 'no title'}
        scrollPosition={scrollPosition}
        effect='opacity'
      />
    </Link>
  )
}

export default CoverImage
