import classnames from 'classnames'
import { memo, useMemo, createElement } from 'react'
import { useHistory } from 'react-router-dom'

import { useFitContent } from '../../../../../hooks/useFitContent'
import { addKey } from '../../../../../utils/addKey'
import Genre from './Genre/Genre'
import styles from './Genres.module.scss'

interface Props {
  as: 'section' | 'footer'
  genres: string[]
  canInteract: boolean
  className?: string
}

const Genres = ({
  as: Tag,
  genres: allGenres,
  canInteract,
  className,
}: Props) => {
  const history = useHistory()
  const { ref, state: genres } = useFitContent(allGenres)

  const _genres = useMemo(() => addKey(genres), [genres])

  if (genres.length === 0) return null

  const setGenre = (genre: string) => history.push(`/search/?genres=${genre}`)

  return createElement(Tag, {
    children: _genres.map(g => (
      <Genre
        key={g.key}
        genre={g.value}
        onClick={canInteract ? () => setGenre(g.value) : undefined}
      />
    )),
    className: classnames(styles.wrapper, className),
    ref,
  })
}

export default memo(Genres)
