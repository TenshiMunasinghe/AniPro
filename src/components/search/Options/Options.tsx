import React, { memo } from 'react'

import Option from '../Option/Option'
import styles from './Options.module.scss'
import classnames from 'classnames'

interface Props {
  onChange: (state: string | string[]) => void
  isMulti?: boolean
  options: {
    label: string
    value: string
  }[]
  defaultValue?: string | string[]
  selected?: string | string[]
  name: string
  isActive: boolean
  id: string
}

const Options = ({
  onChange,
  options,
  isMulti = false,
  defaultValue = isMulti ? [] : '',
  selected = defaultValue,
  name,
  isActive,
  id,
}: Props) => {
  const handleChange = (value: string) => {
    if (!isMulti) {
      onChange(value === selected ? '' : value)
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

  const isAllSelected = options.length === selected.length

  const toggleAll = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(
      isAllSelected
        ? defaultValue
        : Object.values(options).map(({ value }) => value)
    )
  }

  return (
    <section
      className={classnames({ [styles.hide]: !isActive }, styles.container)}>
      <div className={styles.scrollWrapper}>
        {Array.isArray(defaultValue) && (
          <button className={styles.clearFilter} onClick={toggleAll}>
            {isAllSelected ? 'Deselect' : 'Select'} All
          </button>
        )}

        <div className={styles.options}>
          {options.map(({ value, label }) => {
            const key = id + name + label
            return (
              <Option
                value={value}
                label={label}
                handleChange={handleChange}
                isSelected={
                  isMulti ? selected.includes(value) : selected === value
                }
                id={key}
                key={key}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default memo(Options)
