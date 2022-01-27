import { Link } from 'react-router-dom'

interface Props {
  link?: string | null
  text: string | null
  size?: `${string}text-${string}`
  lineHeight?: `leading-${string}`
}

const Title = ({ link, text, size = 'text-lg', lineHeight }: Props) => {
  if (!text) return null
  return (
    <Link
      to={link || '#'}
      className={`line-clamp-2 ${size} ${
        lineHeight || ''
      } transition-all font-semibold hover:text-[color:var(--color-adjusted)]`}>
      {text}
    </Link>
  )
}

export default Title
