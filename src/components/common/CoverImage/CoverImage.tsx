import { useContext } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import { linkToMediaPage } from '../../../App'
import { ScrollPositionContext } from '../CardGrid/CardGrid'
import styles from './CoverImage.module.scss'

interface Props {
  id: number
  title: string
  src: string
}

const CoverImage = ({ id, title, src }: Props) => {
  const scrollPosition = useContext(ScrollPositionContext)

  return (
    <Link
      to={linkToMediaPage(id)}
      aria-label={title}
      className={styles.wrapper}>
      <LazyLoadImage
        src={src}
        alt={title}
        scrollPosition={scrollPosition}
        effect='opacity'
      />
    </Link>
  )
}

export default CoverImage
