import classnames from 'classnames'
import { FC } from 'react'
import Footer from './Footer'

interface Props {
  className?: string
}

const PageWrapper: FC<Props> = ({ className, children }) => {
  return (
    <div
      className={classnames(
        'py-10 px-6 sm:px-8 md:px-12 lg:py-24 lg:px-28',
        className
      )}>
      {children}
      <Footer />
    </div>
  )
}

export default PageWrapper
