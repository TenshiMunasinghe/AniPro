import { memo } from 'react'
import { useHistory } from 'react-router-dom'
import { filterOptionTypes } from '../../../filterOptions/filterOptions'
import { useUpdateUrlParam } from '../../../hooks/useUpdateUrlParam'
import { formatLabel } from '../../../utils/formatLabel'
import Filter from '../Filter/Filter'
import styles from './ActiveFilters.module.scss'

const ActiveFilters = () => {
  const history = useHistory()

  const { updateUrl, initialParams } = useUpdateUrlParam()

  const paramArr = Array.from(initialParams.keys())
    .filter(key => Object.keys(filterOptionTypes.default).includes(key))
    .map(key => ({ key, values: initialParams.get(key)?.split(',') }))

  if (paramArr.length === 0) return null

  const removeParam = (
    key: keyof typeof filterOptionTypes.default,
    value: string
  ) => {
    updateUrl({
      [key]: filterOptionTypes.default[key].isMulti
        ? initialParams
            .get(key)
            ?.split(',')
            .filter(v => v !== value)
        : '',
    })
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
