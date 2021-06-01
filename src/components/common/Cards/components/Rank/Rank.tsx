import styles from './Rank.module.scss'

interface Props {
  rank: number
}

const Rank = ({ rank }: Props) => {
  return (
    <div className={styles.container}>
      <span className={styles.text}>
        <span className={styles.hash}>#</span>
        <span className={styles.rank}>{rank}</span>
      </span>
    </div>
  )
}

export default Rank
