import { FC } from 'react'
import LoadingSpinner from '../common/LoadingSpinner'
import LoadMore, { LoadMoreProps } from '../common/LoadMore'

interface Props extends LoadMoreProps {
  isLoading: boolean
}

const CardContainer: FC<Props> = ({ isLoading, children, ...props }) => {
  if (isLoading) return <LoadingSpinner />
  return (
    <div className='flex flex-col items-center space-y-16'>
      {children}
      <LoadMore {...props} />
    </div>
  )
}

export default CardContainer
