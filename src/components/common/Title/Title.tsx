import { Link } from 'react-router-dom'
import styles from './Title.module.scss'

interface Props {
  link?: string | null
  text: string
}

const Title = ({ link, text }: Props) => {
  return (
    <Link to={link || '#'} className={styles.link}>
      {text}
    </Link>
  )
}

export default Title
