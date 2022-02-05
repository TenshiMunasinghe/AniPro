import classnames from 'classnames'

interface Props {
  isCenter?: {
    x: boolean
    y: boolean
  }
}

const LoadingSpinner = ({ isCenter = { x: true, y: true } }: Props) => {
  return (
    <span
      className={classnames('pointer-events-none h-min animate-spin text-3xl', {
        'mx-auto': isCenter.x,
        'my-auto': isCenter.y,
      })}>
      A
    </span>
  )
}

export default LoadingSpinner
