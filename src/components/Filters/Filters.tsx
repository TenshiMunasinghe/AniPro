import React, { useEffect, useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { v4 } from 'uuid'

import styles from './Filters.module.scss'
import SearchBar from '../SearchBar/SearchBar'
import Select from '../../components/Select/Select'
import { filterOptions } from '../../filterOptions/index'
import { filterStateAtom, FilterStateKeys } from '../../recoil/atoms'
import { toStartCase } from '../../helper'

const Filters = () => {
  const [filterState, setFilterState] = useRecoilState(filterStateAtom)
  // an object to map to the Select component
  const dropDowns = useMemo(() => {
    console.log('created')

    return Object.entries(filterOptions)
      .filter(([key]) => key !== 'sortBy')
      .map(([key, value]) => ({
        key: v4(),
        name: key,
        onChange: (value: string | string[]) => {
          setFilterState(prev => ({
            ...prev,
            [key]: value,
          }))
        },
        isMulti: value.isMulti,
        options: value.options.map(o => ({
          value: o,
          label: ['OVA', 'ONA'].includes(o) ? o : toStartCase(o),
        })),
      }))
  }, [setFilterState])

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
