import React from 'react'
import { AiOutlineCheck } from 'react-icons/ai'

import styles from './Options.module.scss'

interface Props {
  options: { value: string; label: string }[]
  isVisible: boolean
  handleChange: (value: string) => void
  isMulti: boolean
  selected: string | string[]
}

const Options = ({
  isVisible,
  options,
  handleChange,
  isMulti,
  selected,
}: Props) => {
  const isSelected = (val: string) =>
    isMulti ? selected.includes(val) : selected === val

  return (
    <div className={styles.wrapper + (isVisible ? '' : ' ' + styles.hide)}>
      {options.map(o => (
        <div
          className={styles.option}
          key={o.value}
          onClick={() => handleChange(o.value)}>
          <span>{o.label}</span>
          <div
            className={
              styles.iconWrapper +
              (isSelected(o.value) ? '' : ' ' + styles.hide)
            }>
            <AiOutlineCheck />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Options
