import classnames from 'classnames'
import { Link } from 'react-router-dom'

interface Props {
  link?: string | null
  text: string | null
  className?: string
}

const className = {
  textSizes: {
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg',
    xl: 'text-xl',
  },
  textContrast: {
    regular: 'hocus:text-zinc-700 dark:hocus:text-zinc-200',
    high: 'text-zinc-700 dark:text-zinc-300 hocus:text-zinc-900 dark:hocus:text-zinc-100',
  },
}

const Title = ({ link, text, className }: Props) => {
  if (!text) return null
  return (
    <Link
      to={link || '#'}
      className={classnames(
        'transition-all line-clamp-2 hocus:text-[color:var(--color-adjusted)] dark:hocus:text-[color:var(--color-adjusted)]',
        className
      )}>
      {text}
    </Link>
  )
}

export default Title
