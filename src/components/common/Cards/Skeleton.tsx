import classnames from 'classnames'
interface Props {
  className?: string
}

const Skeleton = ({ className }: Props) => {
  return (
    <div
      className={classnames('rounded-sm loading dark:loading-dark', className)}
    />
  )
}

export default Skeleton
