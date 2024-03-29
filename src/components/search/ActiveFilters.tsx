import { memo } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useHistory, useLocation } from 'react-router-dom'
import { filterOptions, filters } from '../../filterOptions/filterOptions'
import { MediaSort } from '../../generated'
import { useUpdateUrlParam } from '../../hooks/useUpdateUrlParam'
import Button from '../common/Button/Button'

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
    <section className='flex gap-x-5 overflow-x-auto'>
      {paramArr.map(({ key, values }) =>
        values?.map(value => (
          <Button
            key={value}
            onClick={() =>
              removeParam(key as keyof typeof filterOptions, value)
            }
            variant='primary'
            className='p-3 text-sm'>
            <span>
              {filters
                .find(({ name }) => name === key)
                ?.options.find(option => option.value === value)?.label || ''}
            </span>
            <FaTimes />
          </Button>
        ))
      )}
      {paramArr.length > 0 && (
        <Button
          onClick={clearFilters}
          variant='secondary'
          className='p-3 text-sm'>
          <span>Clear All</span>
          <FaTimes />
        </Button>
      )}
    </section>
  )
}

export default memo(ActiveFilters)
