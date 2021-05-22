import { Link } from 'react-router-dom'
import styles from './Title.module.scss'
import { linkToMediaPage } from '../../../../../App'
import { adjustColor } from '../../../../../utils/adjustColor'

interface Props {
  id: number
  text: string
  color: string
}

const Title = ({ id, text, color }: Props) => {
  const style = {
    '--color-text': adjustColor(color, 'var(--lightness)'),
  } as React.CSSProperties

  return (
    <Link to={linkToMediaPage(id)} className={styles.link} style={style}>
      {text}
    </Link>
  )
}

export default Title
