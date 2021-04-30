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

const ActiveFilters = memo(() => {
  const history = useHistory()

  const { addFilterOptions, initialParams, params } = useUpdateUrlParam()

  const removeParam = (key: FilterOptionKeys, value: string) => {
    addFilterOptions(
      {
        [key]: filterOptions[key].isMulti
          ? params
              .get(key)
              ?.split(',')
              .filter(v => v !== value)
          : value,
      },
      true
    )
  }
  const paramArr = Array.from(initialParams.keys())
    .filter(key => Object.keys(filterOptions).includes(key))
    .map(key => ({ key, values: params.get(key)?.split(',') }))

  return (
    <section className={styles.wrapper}>
      {paramArr.map(({ key, values }) =>
        values?.map(value => (
          <Filter
            key={value}
            onClick={() => removeParam(key as FilterOptionKeys, value)}
            text={formatLabel(value)}
            variant='primary'
          />
        ))
      )}
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
