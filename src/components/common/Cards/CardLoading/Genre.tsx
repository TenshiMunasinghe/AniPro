import classnames from 'classnames'
import Skeleton from '../Skeleton'

interface Props {
  className?: string
}

const Genre = ({ className }: Props) => {
  return (
    <Skeleton className={classnames('h-7 w-2/5 !rounded-full', className)} />
  )
}

export default Genre
