import classnames from 'classnames'
import { createElement, memo, useMemo } from 'react'
import { Media } from '../../../generated'
import { useFitContent } from '../../../hooks/useFitContent'
import { addKey } from '../../../utils/addKey'
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
  const { ref, state: genres } = useFitContent(allGenres || [])

  const _genres = useMemo(() => addKey(genres), [genres])

  if (!genres || genres.length === 0) return null

  return createElement(Tag, {
    children: _genres.map(({ value, key }) =>
      value ? <Genre key={key} genre={value} canInteract={canInteract} /> : null
    ),
    className: classnames(styles.wrapper, className),
    ref,
  })
}

export default memo(Genres)
