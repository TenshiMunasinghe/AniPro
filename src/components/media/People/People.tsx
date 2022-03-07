import { FC } from 'react'
import LoadMore, { LoadMoreProps } from '../../common/LoadMore/LoadMore'

const People: FC<LoadMoreProps> = ({ children, ...props }) => {
  return (
    <div className=''>
      <div className='media-people--grid'>{children}</div>
      <LoadMore {...props} />
    </div>
  )
}

export default People
