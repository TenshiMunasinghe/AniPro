import styles from './Item.module.scss'

interface Props {
  label: string
  value: string
}

const Item = ({ label, value }: Props) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}: </span>
      {value}
    </div>
  )
}

export default Item
