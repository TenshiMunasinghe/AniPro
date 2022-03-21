import classnames from 'classnames'
import { useState } from 'react'
import ReactTooltip from 'react-tooltip'

interface Props {
  name: string
}

const SpoilerName = ({ name }: Props) => {
  const [isHidden, setIsHidden] = useState(true)

  const onClick = () => setIsHidden(prev => !prev)

  return (
    <span
      className={classnames('relative cursor-pointer whitespace-nowrap', {
        'rounded-sm before:absolute before:inset-0 before:block before:bg-zinc-600 before:content-[""]':
          isHidden,
      })}
      onClick={onClick}
      data-tip
      data-for={name}>
      {name}
      <ReactTooltip id={name} effect='solid'>
        <span className='max-w-[55ch] text-sm text-zinc-200'>
          Spoiler names, click to {isHidden ? 'show' : 'hide'}
        </span>
      </ReactTooltip>
    </span>
  )
}

export default SpoilerName
