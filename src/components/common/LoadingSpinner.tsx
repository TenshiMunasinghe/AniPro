import classnames from 'classnames'

interface Props {
  isCenter?: {
    x: boolean
    y: boolean
  }
}

const LoadingSpinner = ({ isCenter = { x: true, y: true } }: Props) => {
  return (
    <div
      className={classnames(
        'animate-spin text-3xl pointer-events-none h-min ',
        {
          'text-center': isCenter.x,
          'm-auto': isCenter.y,
        }
      )}>
      A
    </div>
  )
}

export default LoadingSpinner
