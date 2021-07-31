import { useParams } from 'react-router-dom'
import { useAnimeCharacters } from '../../../../hooks/useAnimeCharacters'
import { ParamTypes } from '../../../../pages/media/Media'
import Character from '../../Character/Character'
import LoadMore from '../../LoadMore/LoadMore'
import styles from '../People.module.scss'

const Characters = () => {
  const { id } = useParams<ParamTypes>()
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useAnimeCharacters(id)

  if (!data) return null

  return (
    <div className={styles.container}>
      {data.pages.map(characters =>
        characters.edges.map(character => (
          <Character
            character={character}
            key={'character' + character.node.id}
          />
        ))
      )}
      <LoadMore
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage || false}
        onClick={() => fetchNextPage()}
      />
    </div>
  )
}

export default Characters
