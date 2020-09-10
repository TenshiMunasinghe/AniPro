import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaSearch } from 'react-icons/fa'
import { useSetRecoilState } from 'recoil'

import styles from './SearchBar.module.scss'
import { searchTextAtom } from '../../recoil/atoms'

const SearchBar = () => {
  const setSearchText = useSetRecoilState(searchTextAtom)
  const { register, handleSubmit } = useForm()

  const onSubmit = handleSubmit(data => {
    setSearchText(data.searchText)
  })

  const [isFocused, setIsFocused] = useState(false)
  return (
    <form
      onSubmit={onSubmit}
      autoComplete='off'
      className={styles.form + (isFocused ? ' ' + styles.focused : '')}>
      <input
        className={styles.input}
        ref={register}
        name='searchText'
        type='text'
        placeholder='Search'
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <button className={styles.submitButton} type='submit'>
        <FaSearch size='1rem' />
      </button>
    </form>
  )
}

export default SearchBar
