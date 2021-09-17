import { DeepPartial } from 'react-hook-form'
import { FaHeart, FaStar } from 'react-icons/fa'
import { MediaRank } from '../../../generated/index'
import styles from './Ranking.module.scss'

interface Props {
  ranking: DeepPartial<MediaRank> | null
}

const Ranking = ({ ranking }: Props) => {
  if (!ranking) return null

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
