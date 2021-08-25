import classnames from 'classnames'
import { createElement, memo, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { useFitContent } from '../../../hooks/useFitContent'
import { addKey } from '../../../utils/addKey'
import { Media } from '../CardGrid/CardGrid'
import Genre from './Genre/Genre'
import styles from './Genres.module.scss'

interface Props {
  as: 'section' | 'footer'
  genres: Media['genres']
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
  const { ref, state: genres } = useFitContent(allGenres || [])

  const _genres = useMemo(() => addKey(genres), [genres])

  if (!genres || genres.length === 0) return null

  const setGenre = (genre: string) => history.push(`/search/?genres=${genre}`)

  return createElement(Tag, {
    children: _genres.map(({ value, key }) =>
      value ? (
        <Genre
          key={key}
          genre={value}
          onClick={canInteract ? () => setGenre(value) : undefined}
        />
      ) : null
    ),
    className: classnames(styles.wrapper, className),
    ref,
  })
}

export default memo(Genres)
