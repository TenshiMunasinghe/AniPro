import React, { RefObject } from 'react'
import { FaSort } from 'react-icons/fa'

import styles from './SimpleSelect.module.scss'
import { useClickedOutside } from '../../hooks/useClickedOutside'
import Options from '../Options/Options'

interface Props {
  onChange: (state: string | string[]) => void
  isMulti?: boolean
  options: {
    label: string
    value: string
  }[]
  selected: string | string[]
}
const SimpleSelect = ({
  onChange,
  isMulti = false,
  options,
  selected,
}: Props) => {
  const { ref, isClickedOut, handleBlur, handleFocus } = useClickedOutside()

  const handleChange = (value: string) => {
    if (!isMulti) {
      if (value === selected) return
      onChange(value)
      return
    }
    const next = [...(selected as string[])]
    if (next.includes(value)) {
      const i = next.indexOf(value)
      next.splice(i, 1)
    } else {
      next.push(value)
    }
    onChange(next)
  }

  return (
    <div
      className={styles.wrapper}
      aria-haspopup='true'
      aria-expanded={!isClickedOut}>
      <button
        className={styles.dropdownHeader}
        ref={ref as RefObject<HTMLButtonElement>}
        onFocus={handleFocus}
        onBlur={handleBlur}>
        <FaSort aria-label='sort' />
        <div className={styles.selected}>
          {options.find(o => o.value === selected)?.label}
        </div>
      </button>
      <Options
        isVisible={!isClickedOut}
        options={options}
        handleChange={handleChange}
        isMulti={isMulti}
        selected={selected}
      />
    </div>
  )
}

export default SimpleSelect
