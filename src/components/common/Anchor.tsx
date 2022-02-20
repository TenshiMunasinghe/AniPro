import classnames from 'classnames'
import { FC } from 'react'
import { Link } from 'react-router-dom'

const CLASS_NAME = {
  common: '',
  variants: {
    primary: 'hocus:text-zinc-800 dark:hocus:text-zinc-100',
    secondary: `border-b-[1px] border-teal-400 hocus:border-b-2 hocus:mb-[-1px]`,
    highContrast:
      'text-zinc-700 dark:text-zinc-200 hocus:text-zinc-900 dark:hocus:text-white',
  },
}

interface Props {
  to: string | undefined | null
  toExternalSite?: boolean
  variant?: keyof typeof CLASS_NAME.variants
  className?: string
}

const Anchor: FC<Props> = ({
  to,
  toExternalSite = false,
  variant = 'primary',
  className,
  children,
}) => {
  if (!to) return null

  const _className = classnames(
    CLASS_NAME.common,
    CLASS_NAME.variants[variant],
    className
  )

  return toExternalSite ? (
    <a href={to} className={_className} target='_blank' rel='noreferrer'>
      {children}
    </a>
  ) : (
    <Link to={to} className={_className}>
      {children}
    </Link>
  )
}

export default Anchor
