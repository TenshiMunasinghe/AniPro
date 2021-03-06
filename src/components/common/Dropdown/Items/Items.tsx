import classnames from 'classnames'
import { useMemo } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { v4 } from 'uuid'

import styles from './Items.module.scss'

interface Props {
  options: { value: string; label: string }[]
  isVisible: boolean
  handleChange: (value: string) => void
  isMulti: boolean
  selected: string | string[]
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

  const _options = useMemo(() => options.map(o => ({ ...o, key: v4() })), [
    options,
  ])

  return (
    <div
      className={classnames(styles.wrapper, { [styles.hide]: !isVisible })}
      style={{ [position]: 0 }}>
      {_options.map(o => (
        <div className={styles.option} key={o.key}>
          <button
            onClick={() => {
              handleChange(o.value)
            }}>
            <span>{o.label}</span>
            <div
              className={
                styles.iconWrapper +
                (isSelected(o.value) ? '' : ' ' + styles.hide)
              }>
              <AiOutlineCheck aria-label='check' />
            </div>
          </button>
        </div>
      ))}
    </div>
  )
}

export default Items
