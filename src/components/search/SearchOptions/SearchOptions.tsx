import React, { useEffect, useMemo, useState } from 'react'
import styles from './SearchOptions.module.scss'
import { useUpdateUrlParam } from '../../../hooks/useUpdateUrlParam'
import { formatLabel } from '../../../utils/formatLabel'
import { filterOptionTypes } from '../../../filterOptions/filterOptions'
import { v4 } from 'uuid'
import Options from '../Options/Options'
import { toStartCase } from '../../../utils/toStartCase'
import classnames from 'classnames'
import { FaAngleDoubleUp, FaAngleDown } from 'react-icons/fa'

const SearchOptions = () => {
  const [activeFilterOption, setActiveFilterOption] = useState('')
  const { addFilterOptions, params, applyFilter } = useUpdateUrlParam()

  useEffect(() => {
    if (activeFilterOption) {
      document.body.classList.add('search-options-open')
    } else {
      document.body.classList.remove('search-options-open')
    }
  }, [activeFilterOption])

  // an object to map to the Options component
  const filters = useMemo(
    () =>
      Object.entries(filterOptionTypes.default)
        .filter(([key]) => key !== 'sortBy')
        .map(([key, value]) => ({
          key: v4(),
          name: key,
          onChange: (value: string | string[]) => {
            addFilterOptions({ [key]: value }, false)
          },
          isMulti: value.isMulti,
          options: value.options.map(o => ({
            value: o,
            label: formatLabel(o),
          })),
        })),
    [addFilterOptions]
  )

  const closeFilterOptions = () => setActiveFilterOption('')

  const onApply = () => {
    applyFilter()
    closeFilterOptions()
  }

  return (
    <aside
      className={classnames(
        { [styles.active]: activeFilterOption },
        styles.container
      )}>
      <header className={styles.filterOptions}>
        {filters.map(f => (
          <button
            key={f.key}
            className={styles.filterOption}
            onClick={() => setActiveFilterOption(f.name)}>
            <span className={styles.text}>{toStartCase(f.name)}</span>
            <FaAngleDown />
          </button>
        ))}
      </header>
      {filters.map(f => {
        const selected = f.isMulti ? params.getAll(f.name) : params.get(f.name)
        return (
          <Options
            key={f.key}
            onChange={f.onChange}
            isMulti={f.isMulti}
            options={f.options}
            selected={selected ? selected : undefined}
            name={f.name}
            isActive={f.name === activeFilterOption}
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
