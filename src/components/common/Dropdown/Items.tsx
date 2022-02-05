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
        'absolute z-50 max-h-60 min-w-fit max-w-full translate-y-3 divide-y-[1px] divide-zinc-400 overflow-y-auto overflow-x-hidden rounded bg-zinc-100 shadow-md shadow-zinc-500 transition-all dark:divide-zinc-500 dark:bg-zinc-700 dark:shadow-zinc-900',
        {
          'pointer-events-none opacity-0': !isVisible,
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
          className='z-50 flex w-full cursor-pointer items-center justify-start whitespace-nowrap p-3 transition-all hocus:bg-zinc-200 dark:hocus:bg-zinc-600'>
          <span>{o.label}</span>
          <AiOutlineCheck
            aria-label='check'
            className={classnames(
              'ml-2 inline-block fill-teal-400 align-middle',
              { 'opacity-0': !isSelected(o.value) }
            )}
          />
        </button>
      ))}
    </div>
  )
}

export default Items
