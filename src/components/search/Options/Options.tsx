import React, { memo } from 'react'

import Option from '../Option/Option'
import styles from './Options.module.scss'
import classnames from 'classnames'
import { HandleChangeArgs } from '../SearchOptions/SearchOptions'
import { useUpdateUrlParam } from '../../../hooks/useUpdateUrlParam'

interface Props {
  handleChange: (args: HandleChangeArgs) => void
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
  handleChange,
  options,
  isMulti = false,
  defaultValue = isMulti ? [] : '',
  selected = defaultValue,
  name,
  isActive,
  id,
}: Props) => {
  const { addFilterOptions } = useUpdateUrlParam()

  const isAllSelected = options.length === selected.length

  const toggleAll = (e: React.MouseEvent) => {
    e.stopPropagation()
    addFilterOptions(
      {
        [name]: isAllSelected
          ? defaultValue
          : Object.values(options).map(({ value }) => value),
      },
      false
    )
  }

  return (
    <section
      className={classnames({ [styles.hide]: !isActive }, styles.container)}>
      <div className={styles.scrollWrapper}>
        {Array.isArray(defaultValue) && (
          <button className={styles.selectAll} onClick={toggleAll}>
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
                handleChange={() =>
                  handleChange({
                    isMulti,
                    selected,
                    key: name,
                    value,
                    toApply: false,
                  })
                }
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
