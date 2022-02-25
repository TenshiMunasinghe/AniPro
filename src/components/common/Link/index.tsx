import classnames from 'classnames'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { CommonProps } from '../Button/index'

export interface LinkProps {
  variant?: keyof typeof CLASS_NAME.variant
  className?: string
}

interface Props extends LinkProps, CommonProps {}

const CLASS_NAME = {
  variant: {
    primary: 'hocus:text-zinc-800 dark:hocus:text-zinc-100',
    underlined: `border-b-[1px] border-teal-400 hocus:border-b-2 hocus:mb-[-1px]`,
    highContrast:
      'text-zinc-700 dark:text-zinc-200 hocus:text-zinc-900 dark:hocus:text-white',
  },
}

const _LinkWrapper: FC<Props> = ({
  variant = 'primary',
  className,
  children,
  type,
  onClick,
  to,
  toExternalSite,
}) => {
  const _className = classnames('w-fit', CLASS_NAME.variant[variant], className)

  if (type === 'button') {
    return (
      <button onClick={onClick} className={_className}>
        {children}
      </button>
    )
  }

  if (toExternalSite) {
    return (
      <a href={to} target='_blank' rel='noreferrer' className={_className}>
        {children}
      </a>
    )
  }

  return (
    <Link to={to || ''} className={_className}>
      {children}
    </Link>
  )
}

export default _LinkWrapper
