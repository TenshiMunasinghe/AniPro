import { useCallback, useContext } from 'react'
import { createPortal } from 'react-dom'
import { FaAngleDoubleUp, FaAngleDown } from 'react-icons/fa'
import { filters } from '../../../filterOptions/filterOptions'
import { useUpdateUrlParam } from '../../../hooks/useUpdateUrlParam'
import { nextParam, NextParamArgs } from '../../../utils/nextParam'
import { toStartCase } from '../../../utils/toStartCase'
import Button from '../../common/Button/Button'
import { ActiveFilterContext } from '../Media'
import Option from '../Option'

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
      <section className='fixed inset-0 z-50 flex flex-col space-y-5 bg-white px-3 py-7 dark:bg-zinc-800 md:px-7 lg:space-y-8 lg:px-14'>
        <nav className='flex shrink-0 space-x-4 overflow-x-auto'>
          {filters.map(f => (
            <Button
              key={f.key + 'nav'}
              onClick={() => setActiveFilterOption(f.name)}
              size='sm'>
              <span>{toStartCase(f.name)}</span>
              <FaAngleDown />
            </Button>
          ))}
        </nav>
        <section className='flex flex-1 flex-col overflow-hidden'>
          <div className='basis-full space-y-5 overflow-y-auto bg-zinc-100 px-2 py-4 dark:bg-zinc-700 lg:p-7'>
            {activeFilter.isMulti && (
              <button
                className='text-teal-400 hocus:text-teal-500 dark:hocus:text-teal-300'
                onClick={toggleAll}>
                {isAllSelected ? 'Deselect' : 'Select'} All
              </button>
            )}

            <div className='grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4'>
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
        <footer className='flex shrink-0 items-center justify-end gap-x-4'>
          <Button onClick={onApply}>Apply</Button>

          <Button onClick={resetParams}>Reset</Button>

          <button className='hover:text-teal-400' onClick={closeFilterOptions}>
            <FaAngleDoubleUp />
          </button>
        </footer>
      </section>
    ),
    document.getElementById('anipro') || document.body
  )
}

export default Fullview
