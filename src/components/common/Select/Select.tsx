import React, { memo, RefObject, useState } from 'react';
import { FaAngleDown, FaTimes } from 'react-icons/fa';

import { useFocusedWithin } from '../../../hooks/useFocusedWithin';
import { toStartCase } from '../../../utils/toStartCase';
import Options from '../Options/Options';
import styles from './Select.module.scss';

interface Props {
  onChange: (state: string | string[]) => void
  isMulti?: boolean
  options: {
    label: string
    value: string
  }[]
  defaultValue?: string | string[]
  selected?: string | string[]
  name: string
}

const Select = memo(
  ({
    onChange,
    options,
    isMulti = false,
    defaultValue = isMulti ? [] : '',
    selected = defaultValue,
    name: _name,
  }: Props) => {
    const name = toStartCase(_name)
    const [inputState, setInputState] = useState('')
    const { ref, isFocused } = useFocusedWithin()

    const handleChange = (value: string) => {
      setInputState('')
      if (!isMulti) {
        onChange(value === selected ? '' : value)
        return
      }
      const next = [...(selected as string[])]
      if (next.includes(value)) {
        const i = next.indexOf(value)
        next.splice(i, 1)
      } else {
        next.push(value)
      }
      onChange(next)
    }

    const resetSelect = (e: React.MouseEvent) => {
      e.stopPropagation()
      onChange(defaultValue)
      setInputState('')
    }

    return (
      <div className={styles.wrapper}>
        <label className={styles.label} htmlFor={name}>
          {name}
        </label>
        <div
          className={styles.dropdown}
          ref={ref as RefObject<HTMLDivElement>}
          aria-haspopup='true'
          aria-expanded={isFocused}>
          <div className={styles.dropdownHeader}>
            <input
              className={styles.input}
              placeholder={selected.length === 0 ? 'Any' : ''}
              value={inputState}
              id={name}
              name={name}
              onChange={e => setInputState(e.target.value)}
            />

            {selected.length !== 0 && (
              <div className={styles.selected}>
                {isMulti ? (
                  <>
                    <div className={styles.selectedItem}>
                      {options.find(o => o.value === selected[0])?.label}
                    </div>
                    {selected.length > 1 && (
                      <div className={styles.selectedItem}>
                        +{selected.length - 1}
                      </div>
                    )}
                  </>
                ) : (
                  <div className={styles.selectedItem}>
                    {options.find(o => o.value === selected)?.label}
                  </div>
                )}
              </div>
            )}

            {selected.length !== 0 ? (
              <FaTimes onClick={resetSelect} aria-label='reset select' />
            ) : (
              <FaAngleDown aria-label='open select' />
            )}
          </div>

          <Options
            isVisible={isFocused}
            options={options.filter(
              o =>
                o.label.toLowerCase().substring(0, inputState.length) ===
                inputState.toLowerCase()
            )}
            handleChange={handleChange}
            isMulti={isMulti}
            selected={selected}
          />
        </div>
      </div>
    )
  }
)

export default Select
