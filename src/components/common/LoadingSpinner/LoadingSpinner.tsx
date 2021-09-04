import classnames from 'classnames'
import styles from './LoadingSpinner.module.scss'

interface Props {
  isCenter?: {
    x: boolean
    y: boolean
  }
}

const LoadingSpinner = ({ isCenter = { x: true, y: true } }: Props) => {
  return (
    <div
      className={classnames(styles.container, {
        [styles.centerX]: isCenter.x,
        [styles.centerY]: isCenter.y,
      })}>
      A
    </div>
  )
}

export default LoadingSpinner
