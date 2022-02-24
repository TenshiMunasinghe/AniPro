import classnames from 'classnames'
import { FC } from 'react'
import Footer from './Footer'

interface Props {
  className?: string
}

const PageWrapper: FC<Props> = ({ className, children }) => {
  return (
    <div className={classnames('page-padding', className)}>
      {children}
      <Footer />
    </div>
  )
}

export default PageWrapper
