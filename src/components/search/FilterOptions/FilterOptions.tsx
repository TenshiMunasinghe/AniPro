import { useEffect, useState } from 'react'
import { useUpdateUrlParam } from '../../../hooks/useUpdateUrlParam'
import styles from './FilterOptions.module.scss'
import Fullview from './Fullview/Fullview'
import Sidebar from './Sidebar/Sidebar'

//TODO: separate aside section and full view

const FilterOptions = () => {
  const [activeFilterOption, setActiveFilterOption] = useState('')
  const { updateFilter, params, applyFilter } = useUpdateUrlParam()

  useEffect(() => {
    if (activeFilterOption) {
      document.body.classList.add(styles['search-options-open'])
    } else {
      document.body.classList.remove(styles['search-options-open'])
    }
  }, [activeFilterOption])

  return (
    <>
      <Sidebar setActiveFilterOption={setActiveFilterOption} />
      <Fullview
        setActiveFilterOption={setActiveFilterOption}
        activeFilterOption={activeFilterOption}
        updateFilter={updateFilter}
        applyFilter={applyFilter}
        currentParams={params.current}
      />
    </>
  )
}

export default FilterOptions
