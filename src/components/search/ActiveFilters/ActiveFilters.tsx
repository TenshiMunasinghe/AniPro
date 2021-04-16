import React, { memo, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { useUpdateUrlParam } from '../../../hooks/useUpdateUrlParam'
import { formatLabel } from '../../../utils/formatLabel'
import Filter from '../Filter/Filter'
import styles from './ActiveFilters.module.scss'

const TO_EXCLUDE = ['page']

const ActiveFilters = memo(() => {
  const location = useLocation()
  const history = useHistory()
  const params = useMemo(() => new URLSearchParams(location.search), [
    location.search,
  ])
  const { addFilterOptions } = useUpdateUrlParam()

  const removeParam = (key: string, value: string) => {
    addFilterOptions(
      {
        [key]: params.getAll(key).filter(v => v !== value),
      },
      true
    )
  }
  const paramArr = Array.from(params.entries()).filter(
    ([key]) => !TO_EXCLUDE.includes(key)
  )
  return (
    <section className={styles.wrapper}>
      {paramArr.map(([key, value]) => (
        <Filter
          key={value}
          onClick={() => removeParam(key, value)}
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
