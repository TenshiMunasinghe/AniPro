import { useContext } from 'react'
import { FaThumbsUp } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Review as ReviewType } from '../../../api/types'
import { context } from '../../../pages/media/Media'
import Score from '../../common/Score/Score'
import styles from './Review.module.scss'

interface Props {
  review: ReviewType
}

const Review = ({ review }: Props) => {
  const { scrollPosition } = useContext(context)

  return (
    <div className={styles.container}>
      <LazyLoadImage
        scrollPosition={scrollPosition}
        src={review.user.avatar.medium}
        alt={'user ' + review.user.name}
        className={styles.avatar}
      />
      <div className={styles.review}>
        <Score score={review.score} />
        <q className={styles.summary}>"{review.summary}"</q>
        <div className={styles.rating}>
          <FaThumbsUp />
          <span className={styles.number}>{review.rating}</span>
        </div>
      </div>
    </div>
  )
}

export default Review
