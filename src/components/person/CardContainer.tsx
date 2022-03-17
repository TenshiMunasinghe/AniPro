import { FC } from 'react'
import LoadingSpinner from '../common/LoadingSpinner'

interface Props {
  isLoading: boolean
}

const CardContainer: FC<Props> = ({ isLoading, children }) => {
  if (isLoading) return <LoadingSpinner />
  return <div className='min-h-[800px] space-y-5'>{children}</div>
}

export default CardContainer
