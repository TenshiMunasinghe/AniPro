import { useContext } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { NO_IMAGE_URL } from '../../../api/queries'
import { MediaStreamingEpisode } from '../../../generated'
import { context } from '../../../pages/Media'
import styles from './Episode.module.scss'

interface Props {
  episode?: MediaStreamingEpisode | null
}

const Episode = ({ episode }: Props) => {
  const { scrollPosition } = useContext(context)
  return (
    <a href={episode?.url || ''} className={styles.container}>
      <figure className={styles.imageContainer}>
        <LazyLoadImage
          src={episode?.thumbnail || NO_IMAGE_URL}
          alt={episode?.title || 'no image'}
          scrollPosition={scrollPosition}
          className={styles.thumbnail}
        />
      </figure>

      <h6 className={styles.title}>{episode?.title || 'no title'}</h6>
    </a>
  )
}

export default Episode
