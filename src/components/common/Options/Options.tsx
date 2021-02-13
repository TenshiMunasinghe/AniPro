import React, { useMemo } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { v4 } from 'uuid'

import styles from './Options.module.scss'

interface Props {
  options: { value: string; label: string }[]
  isVisible: boolean
  handleChange: (value: string) => void
  isMulti: boolean
  selected: string | string[]
}

export const Options = ({
  isVisible,
  options,
  handleChange,
  isMulti,
  selected,
}: Props) => {
  const isSelected = (val: string) =>
    isMulti ? selected.includes(val) : selected === val

  const _options = useMemo(() => options.map(o => ({ ...o, key: v4() })), [
    options,
  ])

  return (
    <div
      className={styles.wrapper + (isVisible ? '' : ' ' + styles.hide)}
      tabIndex={0}>
      {_options.map(o => (
        <div className={styles.option} key={o.key}>
          <button onClick={() => handleChange(o.value)} tabIndex={-1}>
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
