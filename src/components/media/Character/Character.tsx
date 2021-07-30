import { Characters } from '../../../api/types'
import Person from '../Person/Person'
import styles from './Character.module.scss'

interface Props {
  character: Characters['edges'][number]
}

const Character = ({ character }: Props) => {
  return (
    <div className={styles.container}>
      <Person
        image={character.node.image.large}
        name={character.node.name.full}
        info={character.role}
      />
      <Person
        image={character.voiceActors[0].image.large}
        name={character.voiceActors[0].name.full}
        info='Japanese'
        isReversed
      />
    </div>
  )
}

export default Character
