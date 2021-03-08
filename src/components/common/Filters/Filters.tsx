import React, { memo, useMemo } from 'react'
import { v4 } from 'uuid'

import { filterOptionTypes } from '../../../filterOptions/filterOptions'
import { useUpdateUrlParam } from '../../../hooks/useUpdateUrlParam'
import { formatLabel } from '../../../utils/formatLabel'
import SearchBar from '../SearchBar/SearchBar'
import Select from '../Select/Select'
import styles from './Filters.module.scss'

interface Props {
  filterQuery?: string
}

const Filters = memo(({ filterQuery = '' }: Props) => {
  const updateUrlParams = useUpdateUrlParam()
  const params = useMemo(() => new URLSearchParams(filterQuery), [filterQuery])

  // an object to map to the Select component
  const dropDowns = useMemo(
    () =>
      Object.entries(filterOptionTypes.default)
        .filter(([key]) => key !== 'sortBy')
        .map(([key, value]) => ({
          key: v4(),
          name: key,
          onChange: (value: string | string[]) => {
            updateUrlParams(params, { value, key })
          },
          isMulti: value.isMulti,
          options: value.options.map(o => ({
            value: o,
            label: formatLabel(o),
          })),
        })),
    [params, updateUrlParams]
  )

  return (
    <>
      <SearchBar />
      <section className={styles.dropdowns}>
        {dropDowns.map(d => {
          const selected = d.isMulti
            ? params.getAll(d.name)
            : params.get(d.name)
          return (
            <Select
              key={d.key}
              onChange={d.onChange}
              isMulti={d.isMulti}
              options={d.options}
              selected={selected ? selected : undefined}
              name={d.name}
            />
          )
        })}
      </section>
    </>
  )
})

export default Filters
