import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FaSearch } from 'react-icons/fa'

import styles from './SearchBar.module.scss'

export const SearchBar = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext()

  const onSubmit = handleSubmit(() => {})

  return (
    <form onSubmit={onSubmit} autoComplete='off' className={styles.form}>
      <label htmlFor='searchText'>Search</label>
      <div className={styles.searchBar}>
        <input
          className={styles.input}
          ref={register}
          name='searchText'
          id='searchText'
          type='text'
          placeholder='Type here'
          aria-label='searchbar'
        />
        <button
          className={styles.submitButton}
          type='submit'
          disabled={isSubmitting}
          aria-label='search button'>
          <FaSearch aria-label='search icon' />
        </button>
      </div>
    </form>
  )
}
