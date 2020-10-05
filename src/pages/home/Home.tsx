import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useFormContext } from 'react-hook-form'
import { useRecoilValue, useResetRecoilState } from 'recoil'

import styles from './Home.module.scss'
import { filterStateAtom } from '../../recoil/atoms'
import useSkip from '../../hooks/useSkip'

const Home = () => {
  const {
    reset: resetSearchText,
    formState: { isSubmitted },
  } = useFormContext()
  const filterState = useRecoilValue(filterStateAtom)
  const resetFilterState = useResetRecoilState(filterStateAtom)
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
