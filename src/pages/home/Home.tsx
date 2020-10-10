import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useFormContext } from 'react-hook-form'

import styles from './Home.module.scss'
import { useFilterStateStore, FilterStateStore } from '../../zustand/stores'
import { useSkip } from '../../hooks/useSkip'

const filterStateSelector = ({
  filterState,
  resetFilterState,
}: FilterStateStore) => ({ filterState, resetFilterState })

const Home = () => {
  const {
    reset: resetSearchText,
    formState: { isSubmitted },
  } = useFormContext()
  const { filterState, resetFilterState } = useFilterStateStore(
    filterStateSelector
  )
  const [isStateChanged, setIsStateChanged] = useState(false)

  useEffect(() => {
    resetSearchText({ searchText: '' })
    resetFilterState()
  }, [resetSearchText, resetFilterState])

  useSkip(() => {
    setIsStateChanged(true)
  }, [filterState, setIsStateChanged])

  if (isSubmitted || isStateChanged) {
    return <Redirect push={true} to='/search' />
  }

  return <div className={styles.wrapper}>Home boi</div>
}

export default Home
