import classnames from 'classnames'
import { FC } from 'react'

interface Props {
  className?: string
}

const PageWrapper: FC<Props> = ({ className, children }) => {
  return (
    <div
      className={classnames('pt-10 px-6 sm:px-8 md:px-10 lg:px-12', className)}>
      {children}
    </div>
  )
}

export default PageWrapper
