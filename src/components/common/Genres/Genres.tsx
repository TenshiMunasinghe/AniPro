import React, { memo, useEffect, useMemo, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import styles from './Genres.module.scss'
import { addKey } from '../../../utils/addKey'
import { Genre } from '../Genre/Genre'
import { isChildOverflow } from '../../../utils/isChildOverflow'

interface Props {
  as: 'section' | 'footer'
  genres: string[]
  color: string
  canInteract: boolean
  className?: string
}

export const Genres = memo(
  ({ as: Tag, genres: allGenres, color, canInteract, className }: Props) => {
    const history = useHistory()
    const [genres, setGenres] = useState(allGenres)
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
      if (!ref.current) return
      const _genres = genres

      if (isChildOverflow(ref.current).overflow.either) {
        setGenres(_genres.slice(0, -1))
      }
    }, [genres])

    const setGenre = (genre: string) => history.push(`/search/?genres=${genre}`)
    const _genres = useMemo(() => addKey(genres), [genres])

    return React.createElement(Tag, {
      children: _genres.map(g => (
        <Genre
          key={g.key}
          genre={g.value}
          color={color}
          onClick={canInteract ? () => setGenre(g.value) : undefined}
        />
      )),
      className: styles.wrapper + (className ? ` ${className}` : ''),
      ref,
    })
  }
)
