import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { linkToSearchPage } from '../../utils/linkToSearchPage'

interface Props {
  genre: string
  canInteract?: boolean
  className?: string
}

const Genre = ({ genre, canInteract = true, className }: Props) => {
  const _className = classnames(
    'text-[color:var(--color-adjusted)] flex items-center py-[0.25em] px-[1.25em] bg-zinc-100/50 dark:bg-zinc-700/50 rounded-full border-2 border-[color:var(--color-adjusted)] whitespace-nowrap transition-all cursor-pointer hocus:text-zinc-200 dark:hocus:text-zinc-700 hocus:!bg-[color:var(--color-adjusted)]',
    className
  )
  return canInteract ? (
    <Link className={_className} to={linkToSearchPage({ genres: [genre] })}>
      {genre}
    </Link>
  ) : (
    <div className={_className}>{genre}</div>
  )
}

export default Genre
