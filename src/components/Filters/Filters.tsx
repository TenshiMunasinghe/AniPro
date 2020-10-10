import React, { useMemo } from 'react'
import { v4 } from 'uuid'

import styles from './Filters.module.scss'
import SearchBar from '../SearchBar/SearchBar'
import Select from '../../components/Select/Select'
import { filterOptions } from '../../filterOptions/index'
import {
  useFilterStateStore,
  FilterStateKeys,
  FilterStateStore,
} from '../../zustand/stores'
import { toStartCase } from '../../helper'

const filterStateSelector = ({
  filterState,
  setFilterState,
}: FilterStateStore) => ({ filterState, setFilterState })

const Filters = () => {
  const { filterState, setFilterState } = useFilterStateStore(
    filterStateSelector
  )
  // an object to map to the Select component
  const dropDowns = useMemo(
    () =>
      Object.entries(filterOptions)
        .filter(([key]) => key !== 'sortBy')
        .map(([key, value]) => ({
          key: v4(),
          name: key,
          onChange: (value: string | string[]) => {
            setFilterState({ [key]: value })
          },
          isMulti: value.isMulti,
          options: value.options.map(o => ({
            value: o,
            label: ['OVA', 'ONA'].includes(o) ? o : toStartCase(o),
          })),
        })),
    [setFilterState]
  )

  return (
    <>
      <SearchBar />
      <section className={styles.dropdowns}>
        {dropDowns.map(d => (
          <Select
            key={d.key}
            onChange={d.onChange}
            isMulti={d.isMulti}
            options={d.options}
            selected={filterState[d.name as FilterStateKeys]}
            name={d.name}
          />
        ))}
      </section>
    </>
  )
}

export default Filters
