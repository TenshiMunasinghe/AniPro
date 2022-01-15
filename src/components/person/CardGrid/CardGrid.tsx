import classnames from 'classnames'
import { FC } from 'react'
import styles from '../../common/CardGrid/CardGrid.module.scss'

const CardGrid: FC = ({ children }) => {
  return (
    <div className={classnames(styles.slider, styles.cover)}>{children}</div>
  )
}

export default CardGrid
