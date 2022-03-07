import LoadingSpinner from '../LoadingSpinner'
import styles from './LoadMore.module.scss'

export interface LoadMoreProps {
  isFetchingNextPage: boolean
  hasNextPage: boolean
  onClick: () => void
}

const LoadMore = ({
  isFetchingNextPage,
  hasNextPage,
  onClick,
}: LoadMoreProps) => {
  if (isFetchingNextPage) return <LoadingSpinner />

  if (!hasNextPage) return null

  return (
    <button className={styles.button} onClick={onClick}>
      Load More!
    </button>
  )
}

export default LoadMore
