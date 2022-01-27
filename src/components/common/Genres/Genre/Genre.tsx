import { Link } from 'react-router-dom'
import { linkToSearchPage } from '../../../../utils/linkToSearchPage'

interface Props {
  genre: string
  canInteract?: boolean
}

const style =
  'text-[color:var(--color-adjusted)] flex items-center py-2 px-4 bg-zinc-200/50 dark:bg-zinc-700/50 rounded-lg border-2 border-[color:var(--color-adjusted)] whitespace-nowrap transition-all hocus:text-zinc-200 dark:hocus:text-zinc-700 hocus:!bg-[color:var(--color-adjusted)]'

const Genre = ({ genre, canInteract = true }: Props) => {
  return canInteract ? (
    <Link className={style} to={linkToSearchPage({ genres: [genre] })}>
      {genre}
    </Link>
  ) : (
    <div className={style}>{genre}</div>
  )
}

export default Genre
