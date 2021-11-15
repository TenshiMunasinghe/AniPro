import classnames from 'classnames'
import { useState } from 'react'
import ReactTooltip from 'react-tooltip'
import styles from './SpoilerName.module.scss'

interface Props {
  name: string
}

const SpoilerName = ({ name }: Props) => {
  const [isHidden, setIsHidden] = useState(true)

  const onClick = () => setIsHidden(prev => !prev)

  return (
    <span
      className={classnames(styles.container, { [styles.hidden]: isHidden })}
      onClick={onClick}
      data-tip
      data-for={name}>
      {name}
      <ReactTooltip id={name} effect='solid'>
        <span
          className={styles.tooltip}
          style={{ maxWidth: '55ch', color: 'var(--white-600)' }}>
          Spoiler names, click to {isHidden ? 'show' : 'hide'}
        </span>
      </ReactTooltip>
    </span>
  )
}

export default SpoilerName
