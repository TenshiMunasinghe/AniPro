import React, { CSSProperties } from 'react'

import styles from './Genre.module.scss'
import { adjustColor } from '../../helper'

interface Props {
  genre: string
  onClick?: () => void
  color?: string
}

export const Genre = ({ genre, onClick, color }: Props) => {
  const _color = adjustColor(color, 80)
  const style = {
    '--color-text': _color ? _color : 'var(--color-text-200)',
    '--color-bg': _color ? _color : 'var(--color-text-200)',
    '--color-border': _color ? _color : 'var(--color-text-200)',
  } as CSSProperties
  console.log(_color, style)

  return (
    <button className={styles.genre} onClick={onClick} style={style}>
      {genre}
    </button>
  )
}
