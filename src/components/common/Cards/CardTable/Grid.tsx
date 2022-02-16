import classnames from 'classnames'
import { FC } from 'react'
interface Props {
  className?: string
}

const Grid: FC<Props> = ({ className, children }) => {
  return (
    <div
      className={classnames(
        'grid h-full gap-x-5 gap-y-1 md:grid-cols-[minmax(0,1fr)_6rem_6rem_12rem] md:gap-y-0',
        className
      )}>
      {children}
    </div>
  )
}

export default Grid
