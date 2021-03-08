import React, { ChangeEvent, memo } from 'react';
import { IconType } from 'react-icons';

import styles from './Switch.module.scss';

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  On: IconType
  Off: IconType
  isOn: boolean
  label: string
}

const Switch = memo(({ onChange, On, Off, isOn, label }: Props) => {
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
      {isOn ? <On aria-label='off switch' /> : <Off aria-label='on switch' />}
    </label>
  )
})

export default Switch
