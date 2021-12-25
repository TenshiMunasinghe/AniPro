import styles from './NotFound.module.scss'

interface Props {
  text?: string
}

const NotFound = ({ text = 'Not Found ><' }: Props) => {
  return <div className={styles.wrapper}>{text}</div>
}

export default NotFound
