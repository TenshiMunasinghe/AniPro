import { DeepPartial } from 'react-hook-form'
import { NO_IMAGE_URL } from '../../../api/queries'
import { CharacterEdge } from '../../../generated/index'
import Person from '../Person/Person'
import styles from './Character.module.scss'

interface Props {
  character?: DeepPartial<CharacterEdge> | null
}

const Character = ({ character }: Props) => {
  return (
    <div className={styles.container}>
      <Person
        image={character?.node?.image?.large || NO_IMAGE_URL}
        name={character?.node?.name?.full || 'no name'}
        info={character?.role}
      />
      {character?.voiceActors?.length ? (
        <Person
          image={character?.voiceActors?.[0]?.image?.large || NO_IMAGE_URL}
          name={character?.voiceActors?.[0]?.name?.full || 'no name'}
          info='Japanese'
          isReversed
        />
      ) : null}
    </div>
  )
}

export default Character
