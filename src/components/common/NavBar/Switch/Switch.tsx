import { ChangeEvent, memo } from 'react'
import { IconType } from 'react-icons'

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  On: IconType
  Off: IconType
  isOn: boolean
  label: string
}

const ICON_SIZE = 25

const Switch = ({ onChange, On, Off, isOn, label }: Props) => {
  return (
    <label
      htmlFor='toggleTheme'
      className='flex justify-center items-center rounded-full cursor-pointer p-1 hocus-within:bg-zinc-200 dark:hocus-within:bg-zinc-600'
      aria-label={label}>
      <input
        type='checkbox'
        onChange={onChange}
        id='toggleTheme'
        className='opacity-0 pointer-events-none absolute border-0 p-0'
        checked={isOn}
      />
      {isOn ? (
        <On size={ICON_SIZE} aria-label='off switch' />
      ) : (
        <Off size={ICON_SIZE} aria-label='on switch' />
      )}
    </label>
  )
}

export default memo(Switch)
