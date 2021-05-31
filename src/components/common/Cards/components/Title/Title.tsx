import { Link } from 'react-router-dom'
import styles from './Title.module.scss'
import { linkToMediaPage } from '../../../../../App'

interface Props {
  id: number
  text: string
}

const Title = ({ id, text }: Props) => {
  return (
    <Link to={linkToMediaPage(id)} className={styles.link}>
      {text}
    </Link>
  )
}

export default Title
