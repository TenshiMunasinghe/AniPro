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
        'text-lg transition-all line-clamp-2 hocus:text-[color:var(--color-adjusted)] dark:hocus:text-[color:var(--color-adjusted)]',
        className
      )}>
      {text}
    </Link>
  )
}

export default Title
