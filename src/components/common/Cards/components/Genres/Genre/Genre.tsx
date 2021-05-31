import styles from './Genre.module.scss'

interface Props {
  genre: string
  onClick?: () => void
}

const Genre = ({ genre, onClick }: Props) => {
  return (
    <button
      className={styles.genre}
      onClick={onClick}
      tabIndex={onClick ? 0 : -1}>
      {genre}
    </button>
  )
}

export default Genre
