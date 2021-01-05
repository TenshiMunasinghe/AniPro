import React, { ChangeEvent } from 'react'
import { IconType } from 'react-icons'

import styles from './Switch.module.scss'

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  On: IconType
  Off: IconType
  isOn: boolean
  label: string
}

export const Switch = ({ onChange, On, Off, isOn, label }: Props) => {
  return (
    <label
      htmlFor={styles.checkbox}
      className={styles.switch}
      aria-label={label}>
      <input
        type='checkbox'
        onChange={onChange}
        id={styles.checkbox}
        checked={isOn}
      />
      {isOn ? <On /> : <Off />}
    </label>
  )
}
