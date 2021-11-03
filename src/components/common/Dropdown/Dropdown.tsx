import { memo, RefObject } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { useFocusedWithin } from '../../../hooks/useFocusedWithin'
import styles from './Dropdown.module.scss'
import Items from './Items/Items'

interface Props {
  onChange: (state: string | string[]) => void
  isMulti?: boolean
  options: {
    label: string
    value: string
  }[]
  selected: string | (string | null)[]
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
        <div className={styles.selected}>
          {options.find(o => o.value === selected)?.label}
        </div>
        <FaAngleDown aria-label='toggle dropdown' />
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
