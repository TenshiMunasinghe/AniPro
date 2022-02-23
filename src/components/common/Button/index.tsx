import classnames from 'classnames'
import { useCallback } from 'react'
import { IconType } from 'react-icons'
import { Link } from 'react-router-dom'

export interface ButtonProps {
  variant?: keyof typeof CLASS_NAME.variant
  size?: keyof typeof CLASS_NAME.size
  text?: string
  icon?: IconType
}

interface Props extends ButtonProps {
  isButton: boolean
  onClick?: () => void
  to?: string
  toExternalSite?: boolean
}

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

const _ButtonWrapper = ({
  variant = 'primary',
  size = 'md',
  text = '',
  icon: Icon = undefined,
  onClick,
  to,
  toExternalSite,
  isButton,
}: Props) => {
  const className = classnames(
    'flex items-center space-x-1 whitespace-nowrap rounded text-center leading-none transition-all',
    CLASS_NAME.variant[variant],
    CLASS_NAME.size[size]
  )

  const Content = useCallback(
    () => (
      <>
        <span>{text}</span>
        {Icon && <Icon />}
      </>
    ),
    [text, Icon]
  )

  if (isButton) {
    return (
      <button onClick={onClick} className={className}>
        <Content />
      </button>
    )
  }

  if (toExternalSite) {
    return (
      <a href={to} target='_blank' rel='noreferrer' className={className}>
        <Content />
      </a>
    )
  }

  return (
    <Link to={to || ''} className={className}>
      <Content />
    </Link>
  )
}

export default _ButtonWrapper
