import { FormEvent, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { FaSearch } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'

import styles from './SearchBar.module.scss'
import { useUpdateUrlParam } from '../../../hooks/useUpdateUrlParam'

const SearchBar = () => {
  const history = useHistory()
  const { handleSubmit, register, formState } = useForm<{
    ['searchText']: string
  }>()

  const { initialParams } = useUpdateUrlParam()

  const onSubmit = useCallback(
    (e: FormEvent) => {
      handleSubmit(values => {
        e.preventDefault()
        history.push(
          values.searchText
            ? `/search?searchText=${values.searchText}`
            : '/search'
        )
      })()
    },
    [history, handleSubmit]
  )

  return (
    <form onSubmit={onSubmit} autoComplete='off' className={styles.form}>
      <input
        className={styles.input}
        name={'searchText'}
        id={'searchText'}
        ref={register}
        type='text'
        placeholder='search'
        aria-label='searchbar'
        defaultValue={initialParams.get('searchText') || ''}
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
