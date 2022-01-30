import classnames from 'classnames'
import { Link } from 'react-router-dom'

interface Props {
  link?: string | null
  text: string | null
  className?: string
}

const Title = ({ link, text, className }: Props) => {
  if (!text) return null
  return (
    <Link
      to={link || '#'}
      className={classnames(
        'line-clamp-2 transition-all text-lg hocus:text-[color:var(--color-adjusted)] dark:hocus:text-[color:var(--color-adjusted)]',
        className
      )}>
      {text}
    </Link>
  )
}

export default Title
