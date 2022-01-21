import { useContext } from 'react'
import { DeepPartial } from 'react-hook-form'
import { FaThumbsUp } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { NO_IMAGE_URL } from '../../../api/queries'
import { Review as ReviewType } from '../../../generated/index'
import { context } from '../../../pages/Media'
import Score from '../../common/Score/Score'
import styles from './Review.module.scss'

interface Props {
  review?: DeepPartial<ReviewType> | null
}

const Review = ({ review }: Props) => {
  const { scrollPosition } = useContext(context)

  return (
    <div className={styles.container}>
      <LazyLoadImage
        scrollPosition={scrollPosition}
        src={review?.user?.avatar?.medium || NO_IMAGE_URL}
        alt={'user ' + review?.user?.name || 'no name'}
        className={styles.avatar}
      />
      <div className={styles.review}>
        <Score score={review?.score || 0} />
        <q className={styles.summary}>"{review?.summary || 'no review'}"</q>
        <div className={styles.rating}>
          <FaThumbsUp />
          <span className={styles.number}>{review?.rating}</span>
        </div>
      </div>
    </div>
  )
}

export default Review
