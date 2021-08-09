import { useContext } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Watch } from '../../../api/types'
import { context } from '../../../pages/media/Media'
import styles from './Episode.module.scss'

interface Props {
  episode: Watch['streamingEpisodes'][number]
}

const Episode = ({ episode }: Props) => {
  const { scrollPosition } = useContext(context)
  return (
    <a href={episode.url} className={styles.container}>
      <LazyLoadImage
        src={episode.thumbnail}
        alt={episode.title}
        scrollPosition={scrollPosition}
        className={styles.thumbnail}
      />
      <h6 className={styles.title}>{episode.title}</h6>
    </a>
  )
}

export default Episode
