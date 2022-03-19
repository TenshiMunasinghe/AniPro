import { FormEvent, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { FaSearch } from 'react-icons/fa'
import { useHistory, useLocation } from 'react-router-dom'
import { useUpdateUrlParam } from '../../hooks/useUpdateUrlParam'

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
        //TODO: add fallback to empty search
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
    <form
      onSubmit={onSubmit}
      autoComplete='off'
      className='grid w-full max-w-xl grid-cols-[1fr_auto] items-center rounded-full bg-zinc-100 ring-1 ring-zinc-500 focus-within:ring-teal-500 dark:bg-zinc-700'>
      <input
        className='!border-0 bg-transparent py-3 px-6 !ring-0'
        name='searchText'
        id='searchText'
        ref={register}
        type='text'
        placeholder={placeholder}
        aria-label='searchbar'
        defaultValue={queryVars.initial.searchText || ''}
      />
      <button
        className='h-full pr-6 hocus:text-zinc-900 dark:hocus:text-zinc-100'
        type='submit'
        disabled={formState.isSubmitting}
        aria-label='search button'>
        <FaSearch aria-label='search icon' />
      </button>
    </form>
  )
}

export default SearchBarInput
