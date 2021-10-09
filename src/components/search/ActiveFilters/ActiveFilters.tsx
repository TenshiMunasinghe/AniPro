import { memo } from 'react'
import { filterOptionTypes } from '../../../filterOptions/filterOptions'
import { useUpdateUrlParam } from '../../../hooks/useUpdateUrlParam'
import { formatLabel } from '../../../utils/formatLabel'
import styles from './ActiveFilters.module.scss'
import Filter from './Filter/Filter'

const ActiveFilters = () => {
  const { updateUrl, params, resetParams } = useUpdateUrlParam()

  const paramArr = Array.from(params.initial.keys())
    .filter(key => Object.keys(filterOptionTypes.default).includes(key))
    .map(key => ({
      key,
      values: params.initial.get(key)?.split(',') as string[],
    }))

  if (paramArr.length === 0) return null

  const removeParam = (
    key: keyof typeof filterOptionTypes.default,
    value: string
  ) => {
    updateUrl({
      [key]: filterOptionTypes.default[key].isMulti
        ? params.initial
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
        <Filter onClick={resetParams} text='Clear All' variant='secondary' />
      )}
    </section>
  )
}

export default memo(ActiveFilters)
