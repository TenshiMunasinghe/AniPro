import { FaHeart, FaStar } from 'react-icons/fa'
import { Stats } from '../../../api/types'
import styles from './Ranking.module.scss'

interface Props {
  ranking: Stats['rankings'][number]
}

const Ranking = ({ ranking }: Props) => {
  return (
    <div className={styles.container}>
      {ranking.type === 'POPULAR' ? (
        <FaHeart className={styles.heart} />
      ) : (
        <FaStar className={styles.star} />
      )}
      <span className={styles.context}>
        {`#${ranking.rank} ${ranking.context}`}
        {!ranking.allTime &&
          `${ranking.season ? ' ' + ranking.season.toLowerCase() : ''}${
            ranking.year ? ' ' + ranking.year : ''
          }`}
      </span>
    </div>
  )
}

export default Ranking
