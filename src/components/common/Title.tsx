import { Link } from 'react-router-dom'

const sizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
  '7xl': 'text-7xl',
  '8xl': 'text-8xl',
  '9xl': 'text-9xl',
}

interface Props {
  link?: string | null
  text: string
  size?: keyof typeof sizes
}

const Title = ({ link, text, size = 'lg' }: Props) => {
  return (
    <Link
      to={link || '#'}
      className={`underline line-clamp-2 ${sizes[size]} transition-all font-semibold hover:text-[color:var(--color-adjusted)]`}>
      {text}
    </Link>
  )
}

export default Title
