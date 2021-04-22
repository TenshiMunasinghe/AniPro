import React, { memo } from 'react'
import styles from './Option.module.scss'
import classnames from 'classnames'
import { FaCheck } from 'react-icons/fa'

interface Props {
  value: string
  label: string
  isSelected: boolean
  id: string
  handleChange: (value: string) => void
}

const Option = ({ value, label, isSelected, id, handleChange }: Props) => {
  return (
    <label htmlFor={id} aria-label={label} className={styles.label}>
      <input
        type='checkbox'
        onChange={() => handleChange(value)}
        checked={isSelected}
        className={styles.checkbox}
        id={id}
      />
      <span
        className={classnames(
          { [styles.hide]: !isSelected },
          styles.checkMark
        )}>
        <FaCheck />
      </span>
      <span className={styles.option}>{label}</span>
    </label>
  )
}

export default memo(Option)
