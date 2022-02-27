import { FC } from 'react'

interface Props {
  label: string
}

const Item: FC<Props> = ({ label, children }) => {
  if (!children) return null

  return (
    <div className='whitespace-nowrap lg:whitespace-normal lg:text-sm'>
      <div className='font-light lg:font-bold'>{label}</div>
      {children}
    </div>
  )
}

export default Item
