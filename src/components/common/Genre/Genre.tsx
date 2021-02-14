import React, { CSSProperties, useLayoutEffect, useRef, useState } from 'react'

import { adjustColor } from '../../../utils/adjustColor'
import { checkElementOverflow } from '../../../utils/checkElementOverflow'

import styles from './Genre.module.scss'

interface Props {
  genre: string
  onClick?: () => void
  color?: string
  canInteract?: boolean
}

export const Genre = ({ genre, onClick, color, canInteract = true }: Props) => {
  const [isHidden, setIsHidden] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)

  useLayoutEffect(() => {
    if (isHidden) return
    const isOverflow = checkElementOverflow(ref.current as HTMLElement)?.any

    if (isOverflow) {
      setIsHidden(true)
    }
  }, [isHidden])

  const _color = adjustColor(color, 'var(--lightness)')
  const style = {
    '--color-text': _color ? _color : 'var(--color-text-200)',
    '--color-bg': _color ? _color : 'var(--color-text-200)',
    '--color-border': _color ? _color : 'var(--color-text-200)',
  } as CSSProperties

  return (
    <button
      ref={ref}
      className={styles.genre + (isHidden ? ` ${styles.hide}` : '')}
      onClick={onClick}
      style={style}
      tabIndex={canInteract ? 0 : -1}>
      {genre}
    </button>
  )
}
