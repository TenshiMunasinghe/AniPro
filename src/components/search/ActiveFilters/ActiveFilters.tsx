import React, { memo, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useUpdateUrlParam } from '../../../hooks/useUpdateUrlParam';
import { formatLabel } from '../../../utils/formatLabel';
import Filter from '../Filter/Filter';
import styles from './ActiveFilters.module.scss';

const ActiveFilters = memo(() => {
  const location = useLocation()
  const history = useHistory()
  const params = useMemo(() => new URLSearchParams(location.search), [
    location.search,
  ])
  const updateUrlParams = useUpdateUrlParam()

  const removeParam = (key: string, value: string) => {
    updateUrlParams(params, {
      key,
      value: params.getAll(key).filter(v => v !== value),
    })
  }
  const paramArr = Array.from(params.entries())
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
