import { FC } from 'react'
import LoadMore, { LoadMoreProps } from '../common/LoadMore/LoadMore'

const LoadMoreGrid: FC<LoadMoreProps> = ({ children, ...props }) => {
  return (
    <div className='flex h-min flex-col items-center space-y-5'>
      <div className='media-content--grid'>{children}</div>
      <LoadMore {...props} />
    </div>
  )
}

export default LoadMoreGrid
