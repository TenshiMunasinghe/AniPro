import { useParams } from 'react-router-dom'
import { useAnimeCharacters } from '../../../../hooks/useAnimeCharacters'
import { ParamTypes } from '../../../../pages/media/Media'
import LoadingSpinner from '../../../common/LoadingSpinner/LoadingSpinner'
import Character from '../../Character/Character'
import styles from '../People.module.scss'

const Characters = () => {
  const { id } = useParams<ParamTypes>()
  const { data, fetchNextPage, isFetching } = useAnimeCharacters(id)

  if (!data) return null

  return (
    <div className={styles.container}>
      {data.pages.map(characters =>
        characters.edges.map(character => (
          <Character character={character} key={character.node.id} />
        ))
      )}
      {!isFetching && (
        <button className={styles.loadMore} onClick={() => fetchNextPage()}>
          Load More!
        </button>
      )}
      {isFetching && <LoadingSpinner />}
    </div>
  )
}

export default Characters
