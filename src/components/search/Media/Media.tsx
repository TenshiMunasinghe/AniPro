import React, { createContext, Dispatch, useEffect, useState } from 'react'
import { MediaType } from '../../../generated/index'
import { useUpdateUrlParam } from '../../../hooks/useUpdateUrlParam'
import SearchBarInput from '../../common/SearchBarInput/SearchBarInput'
import Home from './Home'
import styles from './Media.module.scss'
import MediaSearchResult from './MediaSearchResult/MediaSearchResult'

interface Props {
  type: MediaType
}

export const ActiveFilterContext = createContext<{
  activeFilterOption: string
  setActiveFilterOption: Dispatch<string>
}>({ activeFilterOption: '', setActiveFilterOption: () => {} })

const Media = ({ type }: Props) => {
  const { queryVars } = useUpdateUrlParam()
  const [activeFilterOption, setActiveFilterOption] = useState('')

  useEffect(() => {
    if (activeFilterOption) {
      document.body.classList.add(styles['search-options-open'])
    } else {
      document.body.classList.remove(styles['search-options-open'])
    }
  }, [activeFilterOption])

  return (
    <ActiveFilterContext.Provider
      value={{ activeFilterOption, setActiveFilterOption }}>
      <SearchBarInput link={`/search/${type.toLowerCase()}`} />
      {Object.keys(queryVars.initial).length === 0 ? (
        <Home type={type} />
      ) : (
        <MediaSearchResult type={type} />
      )}
    </ActiveFilterContext.Provider>
  )
}

export default Media
