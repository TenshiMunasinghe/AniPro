import { FC } from 'react'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import styles from './CardContainer.module.scss'

interface Props {
  isLoading: boolean
}

const CardContainer: FC<Props> = ({ isLoading, children }) => {
  if (isLoading) return <LoadingSpinner />
  return <div className={styles.container}>{children}</div>
}

export default CardContainer
