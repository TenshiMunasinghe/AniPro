import { memo } from 'react'
import { useHistory } from 'react-router-dom'
import { filterOptionTypes } from '../../../filterOptions/filterOptions'
import { useUpdateUrlParam } from '../../../hooks/useUpdateUrlParam'
import { formatLabel } from '../../../utils/formatLabel'
import Filter from '../Filter/Filter'
import styles from './ActiveFilters.module.scss'

const ActiveFilters = () => {
  const history = useHistory()

  const { addFilterOptions, initialParams, params } = useUpdateUrlParam()

  const paramArr = Array.from(initialParams.keys())
    .filter(key => Object.keys(filterOptionTypes.default).includes(key))
    .map(key => ({ key, values: params.get(key)?.split(',') }))

  if (paramArr.length === 0) return null

  const removeParam = (
    key: keyof typeof filterOptionTypes.default,
    value: string
  ) => {
    addFilterOptions(
      {
        [key]: filterOptionTypes.default[key].isMulti
          ? params
              .get(key)
              ?.split(',')
              .filter(v => v !== value)
          : value,
      },
      true
    )
  }

  return (
    <section className={styles.wrapper}>
      {paramArr.map(({ key, values }) =>
        values?.map(value => (
          <Filter
            key={value}
            onClick={() =>
              removeParam(key as keyof typeof filterOptionTypes.default, value)
            }
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
}

export default memo(ActiveFilters)
