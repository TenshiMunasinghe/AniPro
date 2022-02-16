import classnames from 'classnames'
import { FC } from 'react'

interface Props {
  className?: string
}

const Content: FC<Props> = ({ className, children }) => {
  return (
    <div
      className={classnames(
        'grid flex-1 grid-cols-[4rem_1fr] items-center gap-x-5 rounded p-2 pr-4 md:p-4',
        className
      )}>
      {children}
    </div>
  )
}

export default Content
