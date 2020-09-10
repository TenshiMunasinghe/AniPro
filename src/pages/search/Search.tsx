import React, { useState, useMemo, useEffect } from 'react'
import _ from 'lodash'
import ky from 'ky'
import produce from 'immer'
import { useRecoilState, useRecoilValue } from 'recoil'
import { FaTh, FaThLarge } from 'react-icons/fa'

import styles from './Search.module.scss'
import {
  QueryData,
  QueryVar,
  getsearchResult,
  baseUrl,
} from '../../graphql/queries'
import Select from '../../components/Select/Select'
import Result from '../../components/Result/Result'
import ScrollButton from '../../components/ScrollButton/ScrollButton'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import { filterOptions, SortBy, sortByOptions } from '../../filterOptions/index'
import { toStartCase } from '../../helper'
import { countryCode, Countries } from '../../filterOptions/countryCode'
import SimpleSelect from '../../components/SimpleSelect/SimpleSelect'
import {
  filterStateAtom,
  FilterStateKeys,
  searchTextAtom,
} from '../../recoil/atoms'
import NotFound from '../../components/NotFound/NotFound'

export type CardType = 'default' | 'simple'

const SearchResult = () => {
  const [filterState, setFilterState] = useRecoilState(filterStateAtom)
  const searchText = useRecoilValue(searchTextAtom)
  const [cardType, setCardType] = useState<CardType>('default')
  const [data, setData] = useState<QueryData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const queryVariables: QueryVar = useMemo(
    () => ({
      ...Object.fromEntries(
        Object.entries(filterState).filter(([_, value]) => value.length > 0)
      ),
      searchText: searchText ? searchText : null,
      country: countryCode[filterState.country as Countries],
    }),
    [filterState, searchText]
  )

  useEffect(() => {
    setData(null)
    window.scrollTo(0, 0)
    const fetchData = async () => {
      try {
        setLoading(true)
        const res: { data: QueryData } = await ky
          .post(baseUrl, {
            json: {
              query: getsearchResult,
              variables: queryVariables,
            },
          })
          .json()
        if (!res) {
          return
        }
        setData(res.data)
      } catch (e) {
        setError(e)
        console.error(e)
      }
      setLoading(false)
    }
    fetchData()
  }, [queryVariables])

  useInfiniteScroll(() => {
    if (error || !data || !data.Page.pageInfo.hasNextPage || loading) {
      return
    }
    const loadMore = async () => {
      try {
        setLoading(true)
        const res: { data: QueryData } = await ky
          .post(baseUrl, {
            json: {
              query: getsearchResult,
              variables: {
                ...queryVariables,
                page: data.Page.pageInfo.currentPage + 1,
              },
            },
          })
          .json()
        if (!res) {
          return
        }
        setData(prev => {
          if (prev === null) return res.data
          return produce(prev, next => {
            next.Page.pageInfo = { ...res.data.Page.pageInfo }
            next.Page.media = _.uniqBy(
              [...next.Page.media, ...res.data.Page.media],
              'id'
            )
          })
        })
      } catch (e) {
        setError(e)
        console.error(e)
      }
      setLoading(false)
    }
    loadMore()
  })

  //generates handy object for mapping to the Select component
  const dropDowns = useMemo(
    () =>
      Object.entries(filterOptions)
        .filter(([key]) => key !== 'sortBy')
        .map(([key, value]) => ({
          key,
          onChange: (value: string | string[]) => {
            setFilterState(prev => ({
              ...prev,
              [key]: value,
            }))
          },
          isMulti: value.isMulti,
          options: value.options.map(o => ({
            value: o,
            label: ['OVA', 'ONA'].includes(o) ? o : toStartCase(o),
          })),
        })),
    [setFilterState]
  )

  const sortByOnChange = (value: string | string[]) => {
    setFilterState(prev => ({
      ...prev,
      sortBy: value as SortBy,
    }))
  }

  return (
    <div className={styles.wrapper}>
      <section className={styles.filters}>
        <section className={styles.dropdowns}>
          {dropDowns.map(d => (
            <Select
              key={d.key}
              onChange={d.onChange}
              isMulti={d.isMulti}
              options={d.options}
              selected={filterState[d.key as FilterStateKeys]}
              name={d.key}
            />
          ))}
        </section>

        <section className={styles.extraOptions}>
          <SimpleSelect
            onChange={sortByOnChange}
            isMulti={false}
            options={sortByOptions}
            selected={filterState.sortBy}
          />
          <section className={styles.gridType}>
            <span onClick={() => setCardType('default')}>
              <FaThLarge />
            </span>
            <span>
              <FaTh onClick={() => setCardType('simple')} />
            </span>
          </section>
        </section>
      </section>

      {loading || (!error && data && data.Page.media.length > 0) ? (
        <Result
          loading={loading}
          media={data?.Page.media}
          cardType={cardType}
        />
      ) : (
        <NotFound />
      )}
      <ScrollButton />
    </div>
  )
}

export default SearchResult
