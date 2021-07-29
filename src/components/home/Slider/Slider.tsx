import { QueryVar } from '../../../api/types'
import { useFetchSearchResult } from '../../../hooks/useFetchSearchResult'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import Slide from '../Slide/Slide'
import styles from './Slider.module.scss'

interface Props {
  queryVar: QueryVar
}

const Slider = ({ queryVar }: Props) => {
  const { medias, isLoading } = useFetchSearchResult(
    new URLSearchParams(Object.entries({ ...queryVar, perPage: 5 } as QueryVar))
  )
  return (
    <div className={styles.container}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && medias.length > 0 && (
        <>
          {medias.map(media => (
            <Slide media={media} key={media.id} />
          ))}
        </>
      )}
    </div>
  )
}

export default Slider
