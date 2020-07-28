import React, { useState, RefObject } from 'react'
import styled, { css } from 'styled-components'
import _ from 'lodash'
import { AiOutlineDown, AiOutlineClose } from 'react-icons/ai'

import useComponentVisible from '../hooks/useComponentVisible'
import useSkip from '../hooks/useSkip'

interface Props {
  onChange: (state: string | string[]) => void
  isMulti?: boolean
  options: {
    label: string
    value: string
  }[]
  defaultValue?: string | string[]
  selected: string | string[]
}

const Dropdown = ({
  onChange,
  options,
  isMulti = false,
  defaultValue = isMulti ? [] : '',
  selected,
}: Props) => {
  const [current, setCurrent] = useState(defaultValue)
  const [inputState, setInputState] = useState('')

  useSkip(() => {
    onChange(current)
  }, [current, onChange])

  const { ref, isVisible } = useComponentVisible()

  if (!ref) {
    return <></>
  }

  const handleChange = (value: string) => {
    if (isMulti) {
      setCurrent(prev => {
        const next = [...(prev as string[])]
        if (next.includes(value)) {
          const i = next.indexOf(value)
          next.splice(i, 1)
        } else {
          next.push(value)
        }
        return next
      })
    } else {
      setCurrent(prev => (prev === value ? '' : value))
    }
  }

  const isSelected = (val: string) =>
    isMulti ? selected.includes(val) : selected === val

  return (
    <Wrapper ref={ref as RefObject<HTMLDivElement>}>
      <DropdownHeader>
        {current.length === 0 ? (
          <>
            <Input
              placeholder='Any'
              value={inputState}
              onChange={e => setInputState(e.target.value)}
            />
            <AiOutlineDown />
          </>
        ) : (
          <>
            <SelectedWrapper
              onClick={() => {
                setCurrent(defaultValue)
                setInputState('')
              }}>
              {isMulti ? (
                <>
                  <SelectedItem>{current[0]}</SelectedItem>
                  {current.length > 1 && (
                    <SelectedItem>+ {current.length - 1}</SelectedItem>
                  )}
                </>
              ) : (
                <SelectedItem>{current}</SelectedItem>
              )}
            </SelectedWrapper>
            <AiOutlineClose />
          </>
        )}
      </DropdownHeader>
      <Options showOptions={isVisible}>
        {options
          .filter(
            o =>
              o.label.toLowerCase().substring(0, inputState.length) ===
              inputState.toLowerCase()
          )
          .map(o => (
            <Option key={o.value} onClick={() => handleChange(o.value)}>
              {o.label}
              {isSelected(o.value) && 'selected'}
            </Option>
          ))}
      </Options>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 1rem;
  width: 8rem;
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
`
const Input = styled.input`
  background: transparent;
  border: none;
  color: inherit;
`

const SelectedWrapper = styled.div``

const SelectedItem = styled.div``

const Options = styled.div<{ showOptions: boolean }>`
  z-index: 999;
  position: absolute;
  top: 3rem;
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
  width: 100%;
  position: relative;
  z-index: 999;
  padding: 0.5rem 1rem;

  &:hover {
    background: #222;
    color: #99ccff;
  }
`

export default Dropdown
