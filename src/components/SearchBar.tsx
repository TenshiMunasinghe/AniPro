import React, { useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { AiOutlineSearch } from 'react-icons/ai'
import { useSetRecoilState } from 'recoil'

import { searchTextAtom } from '../recoil/atoms'

const SearchBar = () => {
  const setSearchText = useSetRecoilState(searchTextAtom)
  const { register, handleSubmit } = useForm()
  const onSubmit = handleSubmit(data => {
    setSearchText(data.searchText)
  })

  const [isFocused, setIsFocused] = useState(false)
  return (
    <Form onSubmit={onSubmit} isFocused={isFocused} autoComplete='off'>
      <SearchField
        ref={register}
        name='searchText'
        placeholder='Search'
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <SubmitButton>
        <AiOutlineSearch size='1.2rem' />
      </SubmitButton>
    </Form>
  )
}

const Form = styled.form<{ isFocused: boolean }>`
  display: flex;
  align-items: center;
  background: #121212;
  border-left: solid 0.5px
    ${({ isFocused }) => (isFocused ? '#99ccff' : '#d1d1d1')};
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  height: 50%;
  padding: 0 1rem;
  * {
    height: 100%;
    background: inherit;
    color: inherit;
    border: none;
    font-family: inherit;
    font-size: 0.9rem;
  }
`
const SearchField = styled.input`
  padding: 0.2rem 0;
`

const SubmitButton = styled.button`
  background: #313131;
  padding: 0 0.5rem;
  * {
    background: transparent;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.32);
  }

  &:active {
    background: rgba(255, 255, 255, 0.1);
  }
`

export default SearchBar
