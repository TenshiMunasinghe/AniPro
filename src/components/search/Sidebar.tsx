import { memo, useCallback, useContext } from 'react'
import { filters } from '../../filterOptions/filterOptions'
import { useUpdateUrlParam } from '../../hooks/useUpdateUrlParam'
import { nextParam, NextParamArgs } from '../../utils/nextParam'
import { toStartCase } from '../../utils/toStartCase'
import LinkButton from '../common/Link/LinkButton'
import { ActiveFilterContext } from './Media'
import Option from './Option'

const Sidebar = () => {
  const { setActiveFilterOption } = useContext(ActiveFilterContext)
  const { params, updateUrl } = useUpdateUrlParam()

  const changeUrl = useCallback(
    (args: NextParamArgs) => {
      const next = nextParam(args)
      updateUrl(next)
    },
    [updateUrl]
  )

  return (
    <aside className='hidden h-min gap-y-6 lg:grid'>
      {filters.map(f => (
        <div key={f.key + 'sidebar'} className='space-y-3'>
          <LinkButton onClick={() => setActiveFilterOption(f.name)}>
            {toStartCase(f.name)}
          </LinkButton>
          <div className='grid gap-y-4 text-sm'>
            {f.options.slice(0, 5).map(({ value, label }) => {
              const selected = params.initial.get(f.name)?.split(',') || []
              const key = f.key + f.name + label + 'aside'
              return (
                <Option
                  value={value}
                  label={label}
                  handleChange={() =>
                    changeUrl({
                      isMulti: f.isMulti,
                      selected,
                      key: f.name,
                      value,
                    })
                  }
                  isSelected={
                    f.isMulti ? selected.includes(value) : selected[0] === value
                  }
                  id={key}
                  key={key}
                />
              )
            })}
            {f.options.length > 5 && (
              <LinkButton
                variant='secondary'
                onClick={() => setActiveFilterOption(f.name)}>
                Show More
              </LinkButton>
            )}
          </div>
        </div>
      ))}
    </aside>
  )
}

export default memo(Sidebar)
