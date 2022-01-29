import { createContext, Dispatch, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { filters } from '../../../filterOptions/filterOptions'
import { MediaType } from '../../../generated/index'
import { useUpdateUrlParam } from '../../../hooks/useUpdateUrlParam'
import SearchBarInput from '../../common/SearchBarInput/SearchBarInput'
import Home from '../../home/Home'
import Fullview from '../FilterOptions/Fullview/Fullview'
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
  const location = useLocation()
  const { queryVars } = useUpdateUrlParam()
  const [activeFilterOption, setActiveFilterOption] = useState('')

  useEffect(() => {
    if (activeFilterOption) {
      document.body.classList.add(styles['search-options-open'])
    } else {
      document.body.classList.remove(styles['search-options-open'])
    }

    return () => {
      document.body.classList.remove(styles['search-options-open'])
    }
  }, [activeFilterOption])

  useEffect(() => {
    setActiveFilterOption('')
  }, [location])

  const openFilterOptions = () => setActiveFilterOption(filters[0].name)

  return (
    <ActiveFilterContext.Provider
      value={{ activeFilterOption, setActiveFilterOption }}>
      <SearchBarInput link={`/search/${type.toLowerCase()}`} />
      <div className={styles.advancedFilters}>
        <button onClick={openFilterOptions}>Advanced Filters</button>
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
