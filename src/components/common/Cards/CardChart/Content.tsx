import classnames from 'classnames'
import { FC } from 'react'
interface Props {
  className?: string
}

const Content: FC<Props> = ({ className, children }) => {
  return (
    <div className={classnames('grid grid-rows-[1fr_auto]', className)}>
      {children}
    </div>
  )
}

export default Content
