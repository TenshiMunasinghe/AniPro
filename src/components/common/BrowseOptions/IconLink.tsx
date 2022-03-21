import { FC } from 'react'
import Link from '../Link/Link'

interface Props {
  to: string
}

const IconLink: FC<Props> = ({ children, to }) => {
  return (
    <Link to={to} className='flex items-center space-x-1 text-xs'>
      {children}
    </Link>
  )
}

export default IconLink
