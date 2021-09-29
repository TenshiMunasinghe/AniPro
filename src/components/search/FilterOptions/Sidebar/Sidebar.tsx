import { memo, useCallback } from 'react'
import { filters } from '../../../../filterOptions/filterOptions'
import { useUpdateUrlParam } from '../../../../hooks/useUpdateUrlParam'
import { nextParam, NextParamArgs } from '../../../../utils/nextParam'
import { toStartCase } from '../../../../utils/toStartCase'
import Option from '../../Option/Option'
import styles from './Sidebar.module.scss'

interface Props {
  setActiveFilterOption: (activeFilterOption: string) => void
}

const Sidebar = ({ setActiveFilterOption }: Props) => {
  const { params, updateUrl } = useUpdateUrlParam()

  const changeUrl = useCallback(
    (args: NextParamArgs) => {
      const next = nextParam(args)
      updateUrl(next)
    },
    [updateUrl]
  )

  return (
    <aside className={styles.container}>
      {filters.map(f => (
        <div key={f.key + 'sidebar'}>
          <button
            className={styles.labels}
            onClick={() => setActiveFilterOption(f.name)}>
            {toStartCase(f.name)}
          </button>
          <div className={styles.options}>
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
              <button
                className={styles.showMore}
                onClick={() => setActiveFilterOption(f.name)}>
                {'>'} Show More
              </button>
            )}
          </div>
        </div>
      ))}
    </aside>
  )
}

export default memo(Sidebar)
