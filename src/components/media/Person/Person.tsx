import classnames from 'classnames'
import { toStartCase } from '../../../utils/toStartCase'
import styles from './Person.module.scss'

interface Props {
  image: string
  name: string
  info: string
  isReversed?: boolean
}

const Person = ({ image, name, info, isReversed = false }: Props) => {
  return (
    <div
      className={classnames(styles.container, {
        [styles.reversed]: isReversed,
      })}>
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.details}>
        <div className={styles.name}>{name}</div>
        <div className={styles.info}>{toStartCase(info)}</div>
      </div>
    </div>
  )
}

export default Person
