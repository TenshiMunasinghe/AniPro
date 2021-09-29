import classnames from 'classnames'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FaAngleDoubleUp, FaAngleDown } from 'react-icons/fa'
import { v4 } from 'uuid'
import { filterOptionTypes } from '../../../filterOptions/filterOptions'
import { SearchResultQueryVariables } from '../../../generated'
import { useUpdateUrlParam } from '../../../hooks/useUpdateUrlParam'
import { formatLabel } from '../../../utils/formatLabel'
import { nextParam, NextParamArgs } from '../../../utils/nextParam'
import { toStartCase } from '../../../utils/toStartCase'
import Option from '../Option/Option'
import Options from '../Options/Options'
import styles from './FilterOptions.module.scss'

//TODO: separate aside section and full view

const FilterOptions = () => {
  const [activeFilterOption, setActiveFilterOption] = useState('')
  const { updateFilter, updateUrl, params, applyFilter } = useUpdateUrlParam()

  useEffect(() => {
    if (activeFilterOption) {
      document.body.classList.add(styles['search-options-open'])
    } else {
      document.body.classList.remove(styles['search-options-open'])
    }
  }, [activeFilterOption])

  // an object to map to the Options component
  const filters = useMemo(
    () =>
      Object.entries(filterOptionTypes.default)
        .filter(([key]) => key !== 'sortBy')
        .map(([key, value]) => ({
          key: v4(),
          name: key as keyof SearchResultQueryVariables,
          isMulti: value.isMulti,
          options: value.options.map(o => ({
            value: o,
            label: formatLabel(o),
          })),
        })),
    []
  )

  const changeUrl = useCallback(
    (args: NextParamArgs) => {
      const next = nextParam(args)
      updateUrl(next)
    },
    [updateUrl]
  )

  const changeFilter = useCallback(
    (args: NextParamArgs) => {
      const next = nextParam(args)
      updateFilter(next)
    },
    [updateFilter]
  )

  const closeFilterOptions = () => setActiveFilterOption('')

  const onApply = () => {
    applyFilter()
    closeFilterOptions()
  }

  const selectedOptions = (
    isMulti: boolean,
    name: keyof SearchResultQueryVariables
  ) =>
    isMulti ? params.current.get(name)?.split(',') : params.current.get(name)

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
          <div key={f.key + 'aside'}>
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
                        changeUrl({
                          isMulti: f.isMulti,
                          selected,
                          key: f.name,
                          value,
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
                {f.options.length > 5 && (
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
            handleChange={changeFilter}
            isMulti={f.isMulti}
            options={f.options}
            selected={selected || undefined}
            name={f.name}
            isActive={f.name === activeFilterOption}
            id={f.key}
            updateFilter={updateFilter}
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

export default FilterOptions
