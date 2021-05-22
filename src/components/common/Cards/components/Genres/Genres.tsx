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
  color: string
  canInteract: boolean
  className?: string
}

const Genres = memo(
  ({ as: Tag, genres: allGenres, color, canInteract, className }: Props) => {
    const history = useHistory()
    const { ref, state: genres } = useFitContent(allGenres)

    const setGenre = (genre: string) => history.push(`/search/?genres=${genre}`)
    const _genres = useMemo(() => addKey(genres), [genres])

    return createElement(Tag, {
      children: _genres.map(g => (
        <Genre
          key={g.key}
          genre={g.value}
          color={color}
          onClick={canInteract ? () => setGenre(g.value) : undefined}
        />
      )),
      className: classnames(styles.wrapper, className),
      ref,
    })
  }
)

export default Genres
