import classnames from 'classnames'
import { DebouncedFunc } from 'lodash'
import { memo } from 'react'
import { SearchResultQueryVariables } from '../../../generated'
import { NextParamArgs } from '../../../utils/nextParam'
import Option from '../Option/Option'
import styles from './Options.module.scss'

interface Props {
  handleChange: (args: NextParamArgs) => void
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
  updateFilter: DebouncedFunc<(queryVars: SearchResultQueryVariables) => void>
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
  updateFilter,
}: Props) => {
  const isAllSelected = options.length === selected.length

  const toggleAll = (e: React.MouseEvent) => {
    if (!isMulti) return
    e.stopPropagation()

    updateFilter({
      [name]: isAllSelected
        ? []
        : Object.values(options).map(({ value }) => value),
    })
  }

  return (
    <section
      className={classnames({ [styles.hide]: !isActive }, styles.container)}>
      <div className={styles.scrollWrapper}>
        {isMulti && (
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
