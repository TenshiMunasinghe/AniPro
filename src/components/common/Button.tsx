import classnames from 'classnames'
import { IconType } from 'react-icons'

const CLASS_NAME = {
  variant: {
    primary:
      'bg-zinc-100 dark:bg-zinc-700 hocus:bg-zinc-200 dark:hocus:bg-zinc-600',
    secondary:
      'bg-teal-700 dark:bg-teal-400 text-white dark:text-zinc-800 hocus:bg-teal-900 dark:hocus:bg-teal-300',
  },
  size: {
    sm: 'text-sm p-3',
    md: 'text-base p-4',
    lg: 'text-lg p-5',
  },
}
interface Props {
  text?: string
  onClick: () => void
  variant?: keyof typeof CLASS_NAME.variant
  icon?: IconType
  size?: keyof typeof CLASS_NAME.size
}

const Filter = ({
  text = '',
  onClick,
  variant = 'primary',
  icon: Icon,
  size = 'md',
}: Props) => {
  return (
    <button
      className={classnames(
        'flex items-center space-x-1 whitespace-nowrap rounded text-center leading-none transition-all',
        CLASS_NAME.variant[variant],
        CLASS_NAME.size[size]
      )}
      onClick={onClick}>
      <span>{text}</span>
      {Icon && <Icon />}
    </button>
  )
}

export default Filter
