import React, { memo, RefObject } from 'react'
import { FaSort } from 'react-icons/fa'

import { useFocusedWithin } from '../../../hooks/useFocusedWithin'
import Items from './Items/Items'
import styles from './Dropdown.module.scss'

interface Props {
  onChange: (state: string | string[]) => void
  isMulti?: boolean
  options: {
    label: string
    value: string
  }[]
  selected: string | string[]
}
const Dropdown = ({ onChange, isMulti = false, options, selected }: Props) => {
  const { ref, isFocused } = useFocusedWithin()

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
      aria-expanded={isFocused}
      ref={ref as RefObject<HTMLDivElement>}
      tabIndex={0}>
      <button className={styles.dropdownHeader} tabIndex={-1}>
        <FaSort aria-label='sort' />
        <div className={styles.selected}>
          {options.find(o => o.value === selected)?.label}
        </div>
      </button>
      <Items
        isVisible={isFocused}
        options={options}
        handleChange={handleChange}
        isMulti={isMulti}
        selected={selected}
        position={'right'}
      />
    </div>
  )
}

export default memo(Dropdown)
