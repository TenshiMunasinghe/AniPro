import React, { CSSProperties } from 'react'

import { adjustColor } from '../../../utils/adjustColor'
import styles from './Genre.module.scss'

interface Props {
  genre: string
  onClick?: () => void
  color?: string
}

const Genre = ({ genre, onClick, color }: Props) => {
  const _color = adjustColor(color, 'var(--lightness)')
  const style = {
    '--color-text': _color ? _color : 'var(--color-text-200)',
    '--color-bg': _color ? _color : 'var(--color-text-200)',
    '--color-border': _color ? _color : 'var(--color-text-200)',
  } as CSSProperties

  return (
    <button
      className={styles.genre}
      onClick={onClick}
      style={style}
      tabIndex={onClick ? 0 : -1}>
      {genre}
    </button>
  )
}

export default Genre
