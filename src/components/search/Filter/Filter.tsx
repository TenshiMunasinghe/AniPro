import React from 'react'
import { FaTimes } from 'react-icons/fa'

import styles from './Filter.module.scss'

interface Props {
  text: string
  onClick: () => void
  variant: 'primary' | 'secondary'
}

export const Filter = ({ text, onClick, variant }: Props) => {
  return (
    <button
      className={styles.wrapper + ' ' + styles[variant]}
      onClick={onClick}>
      <span className={styles.text}>{text}</span>
      <FaTimes />
    </button>
  )
}