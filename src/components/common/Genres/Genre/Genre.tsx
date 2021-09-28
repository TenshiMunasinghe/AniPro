import { Link } from 'react-router-dom'
import styles from './Genre.module.scss'

interface Props {
  genre: string
  canInteract?: boolean
}

const Genre = ({ genre, canInteract = true }: Props) => {
  return canInteract ? (
    <Link className={styles.genre} to={`/search?genres=${genre}`}>
      {genre}
    </Link>
  ) : (
    <div className={styles.genre}>{genre}</div>
  )
}

export default Genre
