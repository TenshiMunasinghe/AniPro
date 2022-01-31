import classnames from 'classnames'
import { useMemo } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { v4 } from 'uuid'

interface Props {
  options: { value: string; label: string }[]
  isVisible: boolean
  handleChange: (value: string) => void
  isMulti: boolean
  selected: string | (string | null)[]
  position: 'left' | 'right'
}

const Items = ({
  isVisible,
  options,
  handleChange,
  isMulti,
  selected,
  position,
}: Props) => {
  const isSelected = (val: string) =>
    isMulti ? selected.includes(val) : selected === val

  const _options = useMemo(
    () => options.map(o => ({ ...o, key: v4() })),
    [options]
  )

  return (
    <div
      className={classnames(
        'z-50 absolute transition-all translate-y-3 max-h-60 min-w-fit max-w-full overflow-y-auto overflow-x-hidden bg-zinc-100 dark:bg-zinc-700 rounded shadow-md shadow-zinc-500 dark:shadow-zinc-900 divide-y-[1px] divide-zinc-400 dark:divide-zinc-500',
        {
          'opacity-0 pointer-events-none': !isVisible,
          'left-0': position === 'left',
          'right-0': position === 'right',
        }
      )}>
      {_options.map(o => (
        <button
          onClick={() => {
            handleChange(o.value)
          }}
          key={o.key}
          className='w-full flex items-center justify-start p-3 hocus:bg-zinc-200 dark:hocus:bg-zinc-600 whitespace-nowrap cursor-pointer transition-all z-50'>
          <span>{o.label}</span>
          <AiOutlineCheck
            aria-label='check'
            className={classnames(
              'inline-block align-middle ml-2 fill-teal-400',
              { 'opacity-0': !isSelected(o.value) }
            )}
          />
        </button>
      ))}
    </div>
  )
}

export default Items
