import { useParams } from 'react-router-dom'
import { useAnimeReviews } from '../../../hooks/useAnimeReviews'
import { ParamTypes } from '../../../pages/media/Media'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import LoadMore from '../LoadMore/LoadMore'
import Review from '../Review/Review'
import styles from './Reviews.module.scss'

const Reviews = () => {
  const { id } = useParams<ParamTypes>()
  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useAnimeReviews(id)

  if (isLoading) return <LoadingSpinner />

  if (!data) return null

  return (
    <div className={styles.container}>
      {data.pages.map(page =>
        page.nodes.map(review => (
          <Review key={'review' + review.id} review={review} />
        ))
      )}
      <LoadMore
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage || false}
        onClick={() => fetchNextPage()}
      />
    </div>
  )
}

export default Reviews
