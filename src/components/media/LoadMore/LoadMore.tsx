import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import styles from './LoadMore.module.scss'

interface Props {
  isFetchingNextPage: boolean
  hasNextPage: boolean
  onClick: () => void
}

const LoadMore = ({ isFetchingNextPage, hasNextPage, onClick }: Props) => {
  if (isFetchingNextPage) return <LoadingSpinner />

  if (!hasNextPage) return null

  return (
    <button className={styles.button} onClick={onClick}>
      Load More!
    </button>
  )
}

export default LoadMore
