import React, { RefObject } from 'react'
import { FaSort } from 'react-icons/fa'

import styles from './SimpleSelect.module.scss'
import useComponentVisible from '../../hooks/useComponentVisible'
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
  const { ref, isVisible } = useComponentVisible()

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
    <div className={styles.wrapper} ref={ref as RefObject<HTMLDivElement>}>
      <div className={styles.dropdownHeader}>
        <FaSort />
        <div className={styles.selected}>
          {options.find(o => o.value === selected)?.label}
        </div>
      </div>
      <Options
        isVisible={isVisible}
        options={options}
        handleChange={handleChange}
        isMulti={isMulti}
        selected={selected}
      />
    </div>
  )
}

export default SimpleSelect
