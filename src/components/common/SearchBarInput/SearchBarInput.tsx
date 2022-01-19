import { FormEvent, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { FaSearch } from 'react-icons/fa'
import { useHistory, useLocation } from 'react-router-dom'
import { useUpdateUrlParam } from '../../../hooks/useUpdateUrlParam'
import styles from './SearchBarInput.module.scss'

interface Props {
  link?: string
  placeholder?: string
}

const SearchBarInput = ({ link, placeholder = 'search' }: Props) => {
  const history = useHistory()
  const location = useLocation()
  const { handleSubmit, register, formState } = useForm<{
    ['searchText']: string
  }>()

  const { queryVars } = useUpdateUrlParam()

  const onSubmit = useCallback(
    (e: FormEvent) => {
      handleSubmit(values => {
        e.preventDefault()

        const url = link ? link : location.pathname
        const search = `?searchText=${values.searchText}`

        if (link || search !== location.search) {
          history.push({
            pathname: url,
            search,
          })
        }
      })()
    },
    [history, handleSubmit, link, location]
  )

  return (
    <form onSubmit={onSubmit} autoComplete='off' className={styles.form}>
      <input
        className={styles.input}
        name={'searchText'}
        id={'searchText'}
        ref={register}
        type='text'
        placeholder={placeholder}
        aria-label='searchbar'
        defaultValue={queryVars.initial.searchText || ''}
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

export default SearchBarInput
