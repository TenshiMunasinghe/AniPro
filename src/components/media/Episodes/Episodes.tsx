import { useParams } from 'react-router-dom'
import { useAnimeEpisodes } from '../../../hooks/useAnimeEpisodes'
import { ParamTypes } from '../../../pages/media/Media'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import Episode from '../Episode./Episode'
import styles from './Episodes.module.scss'

const Episodes = () => {
  const { id } = useParams<ParamTypes>()
  const { data, isLoading } = useAnimeEpisodes(id)

  if (isLoading) return <LoadingSpinner />

  if (!data) return null

  return (
    <div className={styles.container}>
      {data.map(episode => (
        <Episode key={'watch' + episode.url} episode={episode} />
      ))}
    </div>
  )
}

export default Episodes
