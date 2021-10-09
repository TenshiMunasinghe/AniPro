import { useContext } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import { NO_IMAGE_URL } from '../../../api/queries'
import { linkToMediaPage } from '../../../App'
import { MediaType } from '../../../generated/index'
import { ScrollPositionContext } from '../CardGrid/CardGrid'
import styles from './CoverImage.module.scss'

interface Props {
  id: number
  title?: string | null
  src?: string | null
  type: MediaType | null
}

const CoverImage = ({ id, title, src, type }: Props) => {
  const scrollPosition = useContext(ScrollPositionContext)

  return (
    <Link
      to={linkToMediaPage(id, type || MediaType.Anime)}
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
