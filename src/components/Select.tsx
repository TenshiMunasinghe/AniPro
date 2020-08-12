import React, { useState, RefObject, useRef } from 'react'
import styled, { css } from 'styled-components'
import { AiOutlineDown, AiOutlineClose, AiOutlineCheck } from 'react-icons/ai'

import useComponentVisible from '../hooks/useComponentVisible'
import { toStartCase } from '../helper'

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

  const isSelected = (val: string) =>
    isMulti ? selected.includes(val) : selected === val

  return (
    <Wrapper>
      <Label>{toStartCase(name)}</Label>
      <Dropdown ref={wrapperRef as RefObject<HTMLDivElement>}>
        <DropdownHeader
          ref={selectedRef as RefObject<HTMLDivElement>}
          onClick={focusInput}>
          <Input
            placeholder={selected.length === 0 ? 'Any' : ''}
            value={inputState}
            onChange={e => setInputState(e.target.value)}
            ref={inputRef}
          />

          {selected.length !== 0 && (
            <SelectedWrapper showSelected={!isSelectedVisible}>
              {isMulti ? (
                <div>
                  <SelectedItem>
                    {options.find(o => o.value === selected[0])?.label}
                  </SelectedItem>
                  {selected.length > 1 && (
                    <SelectedItem>+{selected.length - 1}</SelectedItem>
                  )}
                </div>
              ) : (
                <SelectedItem>
                  {options.find(o => o.value === selected)?.label}
                </SelectedItem>
              )}
            </SelectedWrapper>
          )}

          {selected.length !== 0 ? (
            <AiOutlineClose onClick={resetSelect} />
          ) : (
            <AiOutlineDown />
          )}
        </DropdownHeader>

        <Options showOptions={isDropdownVisible}>
          {options
            .filter(
              o =>
                o.label.toLowerCase().substring(0, inputState.length) ===
                inputState.toLowerCase()
            )
            .map(o => (
              <Option key={o.value} onClick={() => handleChange(o.value)}>
                <span>{o.label}</span>
                <CheckIconWrapper showIcon={isSelected(o.value)}>
                  <AiOutlineCheck />
                </CheckIconWrapper>
              </Option>
            ))}
        </Options>
      </Dropdown>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 1rem;
`

const Label = styled.h5`
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
`

const Dropdown = styled.div`
  width: 10rem;
  position: relative;
`
const DropdownHeader = styled.div`
  height: 2.5rem;
  display: grid;
  grid-template-columns: 85% 1fr;
  align-items: center;
  position: relative;
  z-index: 998;
  padding: 0.5rem;
  background: #323232;
  width: 100%;
  border-radius: 0.2rem;
  cursor: pointer;
`
const Input = styled.input`
  background: transparent;
  border: none;
  color: inherit;
`

const SelectedWrapper = styled.div<{ showSelected: boolean }>`
  display: ${({ showSelected }) => (showSelected ? 'block' : 'none')};
  position: absolute;
  left: 0.5rem;
`

const SelectedItem = styled.div`
  display: inline-block;
  font-size: 0.8rem;
  background: #525252;
  padding: 0.3rem;
  border-radius: 0.2rem;
  margin-right: 0.3rem;
`

const Options = styled.div<{ showOptions: boolean }>`
  z-index: 999;
  position: absolute;
  top: 2.5rem;
  opacity: 1;
  transition: all 0.2s ease-in-out;
  transform: translateY(0.3rem);
  max-height: 15rem;
  overflow-y: scroll;
  background: #323232;
  padding: 0.2rem 0;
  border-radius: 0.2rem;
  ${({ showOptions }) =>
    !showOptions &&
    css`
      opacity: 0;
      pointer-events: none;
      transform: translateY(0);
    `}
`
const Option = styled.div`
  min-width: 8rem;
  position: relative;
  z-index: 999;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: #222;
    span {
      color: #99ccff;
    }
  }
`

const CheckIconWrapper = styled.span<{ showIcon: boolean }>`
  display: inline-flex;
  opacity: ${({ showIcon }) => (showIcon ? '1' : '0')};
  vertical-align: middle;
  margin-left: 0.2rem;
  svg {
    display: inline-block;
    vertical-align: middle;
    fill: #99ccff;
  }
`

export default React.memo(Select)
