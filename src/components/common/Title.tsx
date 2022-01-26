import { Link } from 'react-router-dom'

interface Props {
  link?: string | null
  text: string
  size?: `${string}text-${string}`
}

const Title = ({ link, text, size = 'text-lg' }: Props) => {
  return (
    <Link
      to={link || '#'}
      className={`line-clamp-2 ${size} pb-2 transition-all font-semibold hover:text-[color:var(--color-adjusted)]`}>
      {text}
    </Link>
  )
}

export default Title
