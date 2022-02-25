import { createContext, Dispatch, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { filters } from '../../filterOptions/filterOptions'
import { MediaType } from '../../generated/index'
import { useUpdateUrlParam } from '../../hooks/useUpdateUrlParam'
import LinkButton from '../common/Link/LinkButton'
import SearchBarInput from '../common/SearchBarInput'
import Home from '../home/Home'
import Fullview from './FilterOptions/Fullview'
import MediaSearchResult from './MediaSearchResult'

const BODY_CLASS = ['overflow-y-hidden', 'h-screen']

interface Props {
  type: MediaType
}

export const ActiveFilterContext = createContext<{
  activeFilterOption: string
  setActiveFilterOption: Dispatch<string>
}>({ activeFilterOption: '', setActiveFilterOption: () => {} })

const Media = ({ type }: Props) => {
  const location = useLocation()
  const { queryVars } = useUpdateUrlParam()
  const [activeFilterOption, setActiveFilterOption] = useState('')

  useEffect(() => {
    if (activeFilterOption) {
      document.body.classList.add(...BODY_CLASS)
    } else {
      document.body.classList.remove(...BODY_CLASS)
    }

    return () => {
      document.body.classList.remove(...BODY_CLASS)
    }
  }, [activeFilterOption])

  useEffect(() => {
    setActiveFilterOption('')
  }, [location])

  const openFilterOptions = () => setActiveFilterOption(filters[0].name)

  return (
    <ActiveFilterContext.Provider
      value={{ activeFilterOption, setActiveFilterOption }}>
      <div className='mb-6 flex flex-col items-center space-y-3'>
        <SearchBarInput link={`/search/${type.toLowerCase()}`} />
        <LinkButton onClick={openFilterOptions} className='ml-auto'>
          Advanced Filters
        </LinkButton>
      </div>
      {Object.keys(queryVars.initial).length === 0 ? (
        <>
          <Fullview />
          <Home type={type} />
        </>
      ) : (
        <MediaSearchResult type={type} />
      )}
    </ActiveFilterContext.Provider>
  )
}

export default Media
