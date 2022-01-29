import { useCallback, useContext } from 'react'
import { createPortal } from 'react-dom'
import { FaAngleDoubleUp, FaAngleDown } from 'react-icons/fa'
import { filters } from '../../../../filterOptions/filterOptions'
import { useUpdateUrlParam } from '../../../../hooks/useUpdateUrlParam'
import { nextParam, NextParamArgs } from '../../../../utils/nextParam'
import { toStartCase } from '../../../../utils/toStartCase'
import { ActiveFilterContext } from '../../Media/Media'
import Option from '../../Option/Option'
import styles from './Fullview.module.scss'

const Fullview = () => {
  const { activeFilterOption, setActiveFilterOption } =
    useContext(ActiveFilterContext)
  const { updateFilter, applyFilter, params, resetParams } = useUpdateUrlParam()

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

  const activeFilter = filters.find(({ name }) => name === activeFilterOption)

  if (!activeFilter) return null

  const selected = params.current.get(activeFilterOption)?.split(',') || []

  const isAllSelected = activeFilter.options.length === selected.length

  const toggleAll = (e: React.MouseEvent) => {
    if (!activeFilter.isMulti) return
    e.stopPropagation()

    updateFilter({
      [activeFilterOption]: isAllSelected
        ? []
        : Object.values(activeFilter.options).map(({ value }) => value),
    })
  }

  return createPortal(
    !activeFilterOption ? null : (
      <section className={styles.container}>
        <nav className={styles.filters}>
          {filters.map(f => (
            <button
              key={f.key + 'nav'}
              className={styles.label}
              onClick={() => setActiveFilterOption(f.name)}>
              <span className={styles.text}>{toStartCase(f.name)}</span>
              <FaAngleDown />
            </button>
          ))}
        </nav>
        <section className={styles.optionsContainer}>
          <div className={styles.scrollWrapper}>
            {activeFilter.isMulti && (
              <button className={styles.selectAll} onClick={toggleAll}>
                {isAllSelected ? 'Deselect' : 'Select'} All
              </button>
            )}

            <div className={styles.options}>
              {activeFilter.options.map(({ value, label }) => {
                const key = activeFilter.key + label
                return (
                  <Option
                    value={value}
                    label={label}
                    handleChange={() =>
                      changeFilter({
                        isMulti: activeFilter.isMulti,
                        selected,
                        key: activeFilterOption,
                        value,
                      })
                    }
                    isSelected={
                      activeFilter.isMulti
                        ? selected.includes(value)
                        : selected[0] === value
                    }
                    id={key}
                    key={key}
                  />
                )
              })}
            </div>
          </div>
        </section>
        <footer className={styles.footer}>
          <button className={styles.button} onClick={onApply}>
            Apply
          </button>
          <button className={styles.button} onClick={resetParams}>
            Reset
          </button>
          <button className={styles.close} onClick={closeFilterOptions}>
            <FaAngleDoubleUp />
          </button>
        </footer>
      </section>
    ),
    document.getElementById('anipro') || document.body
  )
}

export default Fullview
