import React, { useState, RefObject, useRef } from 'react'
import { FaAngleDown, FaTimes } from 'react-icons/fa'

import styles from './Select.module.scss'
import Options from '../Options/Options'
import useComponentVisible from '../../hooks/useComponentVisible'
import { toStartCase } from '../../helper'

interface Props {
  onChange: (state: string | string[]) => void
  isMulti?: boolean
  options: {
    label: string
    value: string
  }[]
  defaultValue?: string | string[]
  selected: string | string[]
  name: string
}

const Select = ({
  onChange,
  options,
  isMulti = false,
  defaultValue = isMulti ? [] : '',
  selected,
  name,
}: Props) => {
  const [inputState, setInputState] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    ref: wrapperRef,
    isVisible: isDropdownVisible,
  } = useComponentVisible()
  const {
    ref: selectedRef,
    isVisible: isSelectedVisible,
  } = useComponentVisible()

  if (!wrapperRef || !selectedRef) {
    return <></>
  }

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

  const focusInput = () => {
    inputRef.current && inputRef.current.focus()
  }

  return (
    <div className={styles.wrapper}>
      <h5 className={styles.label}>{toStartCase(name)}</h5>
      <div
        className={styles.dropdown}
        ref={wrapperRef as RefObject<HTMLDivElement>}>
        <div
          className={styles.dropdownHeader}
          ref={selectedRef as RefObject<HTMLDivElement>}
          onClick={focusInput}>
          <input
            className={styles.input}
            placeholder={selected.length === 0 ? 'Any' : ''}
            value={inputState}
            onChange={e => setInputState(e.target.value)}
            ref={inputRef}
          />

          {selected.length !== 0 && (
            <div
              className={
                styles.selected + (isSelectedVisible ? '' : ' ' + styles.hide)
              }>
              {isMulti ? (
                <div>
                  <div className={styles.selectedItem}>
                    {options.find(o => o.value === selected[0])?.label}
                  </div>
                  {selected.length > 1 && (
                    <div className={styles.selectedItem}>
                      +{selected.length - 1}
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.selectedItem}>
                  {options.find(o => o.value === selected)?.label}
                </div>
              )}
            </div>
          )}

          {selected.length !== 0 ? (
            <FaTimes onClick={resetSelect} />
          ) : (
            <FaAngleDown />
          )}
        </div>

        <Options
          isVisible={isDropdownVisible}
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

export default React.memo(Select)
