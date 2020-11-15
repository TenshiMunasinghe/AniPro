import React, { useCallback, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useFormContext } from 'react-hook-form'

import styles from './Home.module.scss'
import { useFilterStateStore, FilterStateStore } from '../../zustand/stores'
import { useSkip } from '../../hooks/useSkip'
import { ky, GET_SEARCH_RESULT, SearchResult } from '../../graphql/queries'
import { SortBy } from '../../filterOptions'

type Data = {
  trending?: SearchResult
  popular?: SearchResult
  'top rated'?: SearchResult
} | null

const filterStateSelector = ({
  filterState,
  resetFilterState,
}: FilterStateStore) => ({ filterState, resetFilterState })

const fetchFor: SortBy[] = ['TRENDING_DESC', 'POPULARITY_DESC', 'SCORE_DESC']

export const Home = () => {
  const {
    reset: resetSearchText,
    formState: { isSubmitted },
  } = useFormContext()
  const { filterState, resetFilterState } = useFilterStateStore(
    filterStateSelector
  )
  const [isStateChanged, setIsStateChanged] = useState(false)

  const [data, setData] = useState<Data>(null)

  const fetchData = useCallback(() => {
    const promises = fetchFor.map(sortBy =>
      ky.post('', {
        json: {
          query: GET_SEARCH_RESULT,
          variables: {
            sortBy,
            page: 1,
            perPage: 10,
          },
        },
      })
    )

    Promise.all(promises)
      .then(async res => res.map(r => r.json()))
      .then(json =>
        Promise.all(json).then(json => {
          const medias = json.map(j => j.data.Page.media)
          setData({
            trending: medias[0],
            popular: medias[1],
            'top rated': medias[2],
          })
        })
      )
  }, [])

  useEffect(() => {
    resetSearchText({ searchText: '' })
    resetFilterState()
  }, [resetSearchText, resetFilterState])

  useSkip(
    () => {
      setIsStateChanged(true)
    },
    [filterState, setIsStateChanged],
    2
  )

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (isSubmitted || isStateChanged) {
    return <Redirect push={true} to='/search' />
  }

  return <div className={styles.wrapper}>Home boi</div>
}
