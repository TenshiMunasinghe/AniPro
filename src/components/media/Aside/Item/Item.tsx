import { FC } from 'react'
import styles from './Item.module.scss'

interface Props {
  label: string
}

const Item: FC<Props> = ({ label, children }) => {
  if (!children) return null

  return (
    <div className={styles.container}>
      <div className={styles.label}>{label}</div>
      <div className={styles.info}>{children}</div>
    </div>
  )
}

export default Item
