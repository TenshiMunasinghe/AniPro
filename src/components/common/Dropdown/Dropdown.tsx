import classnames from 'classnames'
import { memo, RefObject } from 'react'
import { IconType } from 'react-icons'
import { FaAngleDown } from 'react-icons/fa'
import { useFocusedWithin } from '../../../hooks/useFocusedWithin'
import styles from './Dropdown.module.scss'
import Items from './Items/Items'

export interface DropdownProps {
  onChange: (state: string | string[]) => void
  isMulti?: boolean
  options: {
    label: string
    value: string
  }[]
  selected: string | (string | null)[]
  placeholder?: string
  icon?: { type: IconType; isLeft?: boolean }
}
const Dropdown = ({
  onChange,
  isMulti = false,
  options,
  selected,
  placeholder,
  icon,
}: DropdownProps) => {
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

  const selectedLabel = options.find(o => o.value === selected)?.label

  const Icon = () => (icon ? <icon.type /> : <FaAngleDown />)

  return (
    <div
      className={styles.wrapper}
      aria-haspopup='true'
      aria-expanded={isFocused}
      ref={ref as RefObject<HTMLDivElement>}
      tabIndex={0}>
      <button className={styles.dropdownHeader} tabIndex={-1}>
        {icon?.isLeft && <Icon aria-label='toggle dropdown' />}
        <div
          className={classnames(styles.selected, {
            [styles.empty]: !selectedLabel,
          })}>
          {selectedLabel || placeholder || ''}
        </div>
        {!icon?.isLeft && <Icon aria-label='toggle dropdown' />}
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
