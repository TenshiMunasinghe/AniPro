import { Stats } from '../../../api/types'
import styles from './Scores.module.scss'

interface Props {
  scores: Stats['stats']['scoreDistribution']
}

const Scores = ({ scores }: Props) => {
  const totalUserCount = scores.reduce((num, score) => num + score.amount, 0)

  return (
    <div className={styles.container}>
      {scores.map(score => (
        <div key={score.score} className={styles.score}>
          <div className={styles.amount}>{score.amount}</div>
          <div
            className={styles.bar}
            style={{
              height: `calc(${score.amount / totalUserCount} * 69rem)`,
              background: `hsl(${score.score}, 65%, 50%)`,
            }}
          />
          <div className={styles.label}>{score.score}</div>
        </div>
      ))}
    </div>
  )
}

export default Scores
