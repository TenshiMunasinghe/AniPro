import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styles from './SearchOptions.module.scss'
import { useUpdateUrlParam } from '../../../hooks/useUpdateUrlParam'
import { formatLabel } from '../../../utils/formatLabel'
import { filterOptionTypes } from '../../../filterOptions/filterOptions'
import { v4 } from 'uuid'
import Options from '../Options/Options'
import { toStartCase } from '../../../utils/toStartCase'
import classnames from 'classnames'
import { FaAngleDoubleUp, FaAngleDown } from 'react-icons/fa'
import Option from '../Option/Option'

export type HandleChangeArgs = {
  isMulti: boolean
  selected: string | string[]
  key: string
  value: string
  toApply: boolean
}

const SearchOptions = () => {
  const [activeFilterOption, setActiveFilterOption] = useState('')
  const { addFilterOptions, params, applyFilter } = useUpdateUrlParam()

  useEffect(() => {
    if (activeFilterOption) {
      document.body.classList.add(styles['search-options-open'])
    } else {
      document.body.classList.remove(styles['search-options-open'])
    }
  }, [activeFilterOption])

  const handleChange = useCallback(
    ({ isMulti, selected, key, value, toApply }: HandleChangeArgs) => {
      if (!isMulti) {
        addFilterOptions({ [key]: value === selected ? '' : value }, toApply)
        return
      }
      const next = [...(selected as string[])]
      if (next.includes(value)) {
        const i = next.indexOf(value)
        next.splice(i, 1)
      } else {
        next.push(value)
      }
      addFilterOptions({ [key]: next }, toApply)
    },
    [addFilterOptions]
  )

  // an object to map to the Options component
  const filters = useMemo(
    () =>
      Object.entries(filterOptionTypes.default)
        .filter(([key]) => key !== 'sortBy')
        .map(([key, value]) => ({
          key: v4(),
          name: key,
          isMulti: value.isMulti,
          options: value.options.map(o => ({
            value: o,
            label: formatLabel(o),
          })),
        })),
    []
  )

  const closeFilterOptions = () => setActiveFilterOption('')

  const onApply = () => {
    applyFilter()
    closeFilterOptions()
  }

  const selectedOptions = (isMulti: boolean, name: string) =>
    isMulti ? params.get(name)?.split(',') : params.get(name)

  return (
    <aside
      className={classnames(
        { [styles.active]: activeFilterOption },
        styles.container
      )}>
      <header
        className={classnames(
          { [styles.vertical]: !activeFilterOption },
          styles.filterOptions
        )}>
        {filters.map(f => (
          <div key={f.key + 'aside'} className={styles.filterOptionContainer}>
            <button
              className={classnames(
                { [styles.active]: f.name === activeFilterOption },
                styles.filterOption
              )}
              onClick={() => setActiveFilterOption(f.name)}>
              <span className={styles.text}>{toStartCase(f.name)}</span>
              <FaAngleDown />
            </button>

            {!activeFilterOption && (
              // only on desktop
              <div className={styles.options}>
                {f.options.slice(0, 5).map(({ value, label }) => {
                  const selected = selectedOptions(f.isMulti, f.name) || []
                  const key = f.key + f.name + label + 'aside'
                  return (
                    <Option
                      value={value}
                      label={label}
                      handleChange={() =>
                        handleChange({
                          isMulti: f.isMulti,
                          selected,
                          key: f.name,
                          value,
                          toApply: true,
                        })
                      }
                      isSelected={
                        f.isMulti
                          ? selected.includes(value)
                          : selected === value
                      }
                      id={key}
                      key={key}
                    />
                  )
                })}
                {f.isMulti && f.options.length > 5 && (
                  <button
                    className={styles.showMore}
                    onClick={() => setActiveFilterOption(f.name)}>
                    {'>'} Show More
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </header>
      {filters.map(f => {
        const selected = selectedOptions(f.isMulti, f.name)
        return (
          <Options
            key={f.key}
            handleChange={handleChange}
            isMulti={f.isMulti}
            options={f.options}
            selected={selected || undefined}
            name={f.name}
            isActive={f.name === activeFilterOption}
            id={f.key}
          />
        )
      })}
      {activeFilterOption && (
        <footer className={styles.footer}>
          <button className={styles.applyFilter} onClick={onApply}>
            Apply
          </button>
          <button className={styles.close} onClick={closeFilterOptions}>
            <FaAngleDoubleUp />
          </button>
        </footer>
      )}
    </aside>
  )
}

export default SearchOptions
