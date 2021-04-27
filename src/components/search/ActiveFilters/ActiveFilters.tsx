import React, { memo } from 'react'
import { useHistory } from 'react-router-dom'

import { useUpdateUrlParam } from '../../../hooks/useUpdateUrlParam'
import { formatLabel } from '../../../utils/formatLabel'
import Filter from '../Filter/Filter'
import styles from './ActiveFilters.module.scss'
import {
  filterOptions,
  FilterOptionKeys,
} from '../../../filterOptions/filterOptions'

const TO_EXCLUDE = ['page', 'perPage']

const ActiveFilters = memo(() => {
  const history = useHistory()

  const { addFilterOptions, initialParams } = useUpdateUrlParam()

  const removeParam = (key: FilterOptionKeys, value: string) => {
    addFilterOptions(
      {
        [key]: filterOptions[key].isMulti ? [value] : value,
      },
      true
    )
  }
  const paramArr = Array.from(initialParams.entries()).filter(
    ([key]) => !TO_EXCLUDE.includes(key)
  )
  return (
    <section className={styles.wrapper}>
      {paramArr.map(([key, value]) => (
        <Filter
          key={value}
          onClick={() => removeParam(key as FilterOptionKeys, value)}
          text={
            key === 'search'
              ? `Search: ${formatLabel(value)}`
              : formatLabel(value)
          }
          variant='primary'
        />
      ))}
      {paramArr.length > 0 && (
        <Filter
          onClick={() => history.push('/search')}
          text='Clear All'
          variant='secondary'
        />
      )}
    </section>
  )
})

export default ActiveFilters
