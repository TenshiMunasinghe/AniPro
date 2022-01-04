import { memo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { filterOptions } from '../../../filterOptions/filterOptions'
import { MediaSort } from '../../../generated'
import { useUpdateUrlParam } from '../../../hooks/useUpdateUrlParam'
import { formatLabel } from '../../../utils/formatLabel'
import styles from './ActiveFilters.module.scss'
import Filter from './Filter/Filter'

const ActiveFilters = () => {
  const history = useHistory()
  const { pathname } = useLocation()
  const { updateUrl, params } = useUpdateUrlParam()

  const paramArr = Array.from(params.initial.keys())
    .filter(key => Object.keys(filterOptions).includes(key))
    .map(key => ({
      key,
      values: params.initial.get(key)?.split(',') as string[],
    }))

  if (paramArr.length === 0) return null

  const removeParam = (key: keyof typeof filterOptions, value: string) => {
    updateUrl({
      [key]: filterOptions[key].isMulti
        ? params.initial
            .get(key)
            ?.split(',')
            .filter(v => v !== value)
        : '',
    })
  }

  const clearFilters = () =>
    history.push({
      pathname,
      search: `sortBy=${MediaSort.TrendingDesc}`,
    })

  return (
    <section className={styles.wrapper}>
      {paramArr.map(({ key, values }) =>
        values?.map(value => (
          <Filter
            key={value}
            onClick={() =>
              removeParam(key as keyof typeof filterOptions, value)
            }
            text={formatLabel(value)}
            variant='primary'
          />
        ))
      )}
      {paramArr.length > 0 && (
        <Filter onClick={clearFilters} text='Clear All' variant='secondary' />
      )}
    </section>
  )
}

export default memo(ActiveFilters)
