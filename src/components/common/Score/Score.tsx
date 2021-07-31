import FaceIcon from '../FaceIcon/FaceIcon'
import styles from './Score.module.scss'

interface Props {
  score: number
}

const Score = ({ score }: Props) => {
  return (
    <div className={styles.wrapper}>
      <FaceIcon meanScore={score} />
      <span className={styles.score}>{score}%</span>
    </div>
  )
}

export default Score
