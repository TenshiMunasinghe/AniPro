import React, { memo, useEffect, useMemo, useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useResizeDetector } from 'react-resize-detector'

import styles from './Genres.module.scss'
import { addKey } from '../../../utils/addKey'
import { isChildOverflow } from '../../../utils/isChildOverflow'
import Genre from '../Genre/Genre'

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
    const [genres, setGenres] = useState(allGenres)

    const onResize = useCallback(() => {
      setGenres(allGenres)
    }, [allGenres])
    const { width, ref } = useResizeDetector({
      onResize,
      refreshMode: 'debounce',
      refreshRate: 250,
    })

    useEffect(() => {
      if (!ref.current || !width) return
      const _genres = genres

      if (isChildOverflow(ref.current as HTMLElement).overflow.either) {
        setGenres(_genres.slice(0, -1))
      }
    }, [genres, ref, width])

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

export default Genres
