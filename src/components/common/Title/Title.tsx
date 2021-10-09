import { Link } from 'react-router-dom'
import { linkToMediaPage } from '../../../App'
import { MediaType } from '../../../generated/index'
import styles from './Title.module.scss'

interface Props {
  id: number
  text: string
  type: MediaType | null
}

const Title = ({ id, text, type }: Props) => {
  return (
    <Link
      to={linkToMediaPage(id, type || MediaType.Anime)}
      className={styles.link}>
      {text}
    </Link>
  )
}

export default Title
