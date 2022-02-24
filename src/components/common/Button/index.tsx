import classnames from 'classnames'
import { FC } from 'react'
import { Link } from 'react-router-dom'

export interface ButtonProps {
  variant?: keyof typeof CLASS_NAME.variant
  size?: keyof typeof CLASS_NAME.size
}

export interface CommonProps {
  type: 'button' | 'link'
  onClick?: () => void
  to?: string
  toExternalSite?: boolean
}

interface Props extends ButtonProps, CommonProps {}

const CLASS_NAME = {
  variant: {
    primary:
      'bg-zinc-100 dark:bg-zinc-700 hocus:bg-zinc-200 dark:hocus:bg-zinc-600',
    secondary:
      'bg-teal-600 dark:bg-teal-400 text-white dark:text-zinc-800 hocus:bg-teal-700 dark:hocus:bg-teal-300',
  },
  size: {
    sm: 'text-sm p-3',
    md: 'text-base p-4',
    lg: 'text-lg p-5',
  },
}

const _ButtonWrapper: FC<Props> = ({
  variant = 'primary',
  size = 'md',
  onClick,
  to,
  toExternalSite,
  type,
  children,
}) => {
  const className = classnames(
    'flex items-center space-x-1 whitespace-nowrap rounded text-center leading-none transition-all',
    CLASS_NAME.variant[variant],
    CLASS_NAME.size[size]
  )

  if (type === 'button') {
    return (
      <button onClick={onClick} className={className}>
        {children}
      </button>
    )
  }

  if (toExternalSite) {
    return (
      <a href={to} target='_blank' rel='noreferrer' className={className}>
        {children}
      </a>
    )
  }

  return (
    <Link to={to || ''} className={className}>
      {children}
    </Link>
  )
}

export default _ButtonWrapper
