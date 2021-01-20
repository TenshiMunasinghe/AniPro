import React, { FormEvent, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { FaSearch } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'

import styles from './SearchBar.module.scss'
import { SEARCH_TEXT } from '../../../api/queries'

export const SearchBar = () => {
  const history = useHistory()
  const { handleSubmit, register, formState } = useForm<{
    [SEARCH_TEXT]: string
  }>()

  const onSubmit = useCallback(
    (e: FormEvent) => {
      handleSubmit(values => {
        e.preventDefault()
        history.push(`/search?${SEARCH_TEXT}=${values[SEARCH_TEXT]}`)
      })()
    },
    [history, handleSubmit]
  )

  return (
    <form onSubmit={onSubmit} autoComplete='off' className={styles.form}>
      <label htmlFor={SEARCH_TEXT}>Search</label>
      <div className={styles.searchBar}>
        <input
          className={styles.input}
          name={SEARCH_TEXT}
          id={SEARCH_TEXT}
          ref={register}
          type='text'
          placeholder='Type here'
          aria-label='searchbar'
        />
        <button
          className={styles.submitButton}
          type='submit'
          disabled={formState.isSubmitting}
          aria-label='search button'>
          <FaSearch aria-label='search icon' />
        </button>
      </div>
    </form>
  )
}
