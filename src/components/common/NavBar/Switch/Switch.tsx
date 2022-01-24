import { ChangeEvent, memo } from 'react'
import { IconType } from 'react-icons'

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  On: IconType
  Off: IconType
  isOn: boolean
  label: string
}

const ICON_SIZE = '1.5rem'

const Switch = ({ onChange, On, Off, isOn, label }: Props) => {
  return (
    <label
      htmlFor='toggleTheme'
      className='flex justify-center items-center rounded-full cursor-pointer hover:bg-gray'
      aria-label={label}>
      <input
        type='checkbox'
        onChange={onChange}
        id='toggleTheme'
        className='hidden'
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
