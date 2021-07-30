import { CSSProperties } from 'react'
import { Watch } from '../../../api/types'
import styles from './Episode.module.scss'

interface Props {
  episode: Watch['streamingEpisodes'][number]
}

const Episode = ({ episode }: Props) => {
  const style = { '--thumbnail': `url(${episode.thumbnail})` } as CSSProperties
  return (
    <a href={episode.url} className={styles.container} style={style}>
      <h6 className={styles.title}>{episode.title}</h6>
    </a>
  )
}

export default Episode
