import { FC } from 'react'
import LoadingSpinner from '../common/LoadingSpinner'
import LoadMore, { LoadMoreProps } from '../common/LoadMore/LoadMore'

interface Props extends LoadMoreProps {
  isLoading: boolean
}

const CardContainer: FC<Props> = ({ isLoading, children, ...props }) => {
  if (isLoading) return <LoadingSpinner />
  return (
    <div className='flex min-h-[800px] flex-col items-center space-y-16'>
      {children}
      <LoadMore {...props} />
    </div>
  )
}

export default CardContainer
