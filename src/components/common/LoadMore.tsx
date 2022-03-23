import Button from './Button/Button'
import LoadingSpinner from './LoadingSpinner'

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
    <Button className='w-min p-4' onClick={onClick}>
      Load More!
    </Button>
  )
}

export default LoadMore
