import React, { useMemo } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { createRipples } from 'react-ripples'
import { v4 } from 'uuid'

import styles from './Options.module.scss'

interface Props {
  options: { value: string; label: string }[]
  isVisible: boolean
  handleChange: (value: string) => void
  isMulti: boolean
  selected: string | string[]
}

const Ripple = createRipples({
  color: 'rgba(255, 255, 255, 0.1)',
  during: 500,
})

const Options = ({
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
    <div className={styles.wrapper + (isVisible ? '' : ' ' + styles.hide)}>
      {_options.map(o => (
        <div className={styles.option} key={o.key}>
          <Ripple>
            <button onClick={() => handleChange(o.value)}>
              <span>{o.label}</span>
              <div
                className={
                  styles.iconWrapper +
                  (isSelected(o.value) ? '' : ' ' + styles.hide)
                }>
                <AiOutlineCheck aria-label='check' />
              </div>
            </button>
          </Ripple>
        </div>
      ))}
    </div>
  )
}

export default Options
