import { Link } from 'react-router-dom'
import { linkToSearchPage } from '../../utils/linkToSearchPage'

interface Props {
  genre: string
  canInteract?: boolean
}

const className =
  'text-[color:var(--color-adjusted)] flex items-center py-[0.25em] px-[1.25em] bg-zinc-200/50 dark:bg-zinc-700/50 rounded-full border-2 border-[color:var(--color-adjusted)] whitespace-nowrap transition-all cursor-pointer hocus:text-zinc-200 dark:hocus:text-zinc-700 hocus:!bg-[color:var(--color-adjusted)]'

const Genre = ({ genre, canInteract = true }: Props) => {
  return canInteract ? (
    <Link className={className} to={linkToSearchPage({ genres: [genre] })}>
      {genre}
    </Link>
  ) : (
    <div className={className}>{genre}</div>
  )
}

export default Genre
