import { memo } from 'react'

interface Props {
  value: string
  label: string
  isSelected: boolean
  id: string
  handleChange: (value: string) => void
}

const Option = ({ value, label, isSelected, id, handleChange }: Props) => {
  return (
    <label
      htmlFor={id}
      aria-label={label}
      className='grid w-fit cursor-pointer grid-cols-[auto_1fr] items-center justify-start gap-x-2 rounded hocus:text-teal-400'>
      <input
        type='checkbox'
        onChange={() => handleChange(value)}
        checked={isSelected}
        id={id}
        className='cursor-pointer rounded-sm bg-zinc-200 text-teal-500 ring-offset-zinc-100 focus:ring-teal-500'
      />
      {label}
    </label>
  )
}

export default memo(Option)
