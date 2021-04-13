import React, { FormEvent, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { FaSearch } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'

import { SEARCH_TEXT } from '../../../api/queries'
import styles from './SearchBar.module.scss'

const SearchBar = () => {
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
      <input
        className={styles.input}
        name={SEARCH_TEXT}
        id={SEARCH_TEXT}
        ref={register}
        type='text'
        placeholder='search'
        aria-label='searchbar'
      />
      <button
        className={styles.submitButton}
        type='submit'
        disabled={formState.isSubmitting}
        aria-label='search button'>
        <FaSearch aria-label='search icon' />
      </button>
    </form>
  )
}

export default SearchBar
