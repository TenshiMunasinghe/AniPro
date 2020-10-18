import React from 'react'

import styles from './Genre.module.scss'

interface Props {
  genre: string
  onClick?: () => void
}

export const Genre = ({ genre, onClick }: Props) => {
  return (
    <button className={styles.genre} onClick={onClick}>
      {genre}
    </button>
  )
}
