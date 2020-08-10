import React, { useState, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import ky from 'ky'
import produce from 'immer'

import {
  QueryData,
  QueryVar,
  getsearchResult,
  imageSize,
  baseUrl,
} from '../graphql/queries'
import Select from '../components/Select'
import Result from '../components/Result'
import ScrollButton from '../components/ScrollButton'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import { filterOptions, SortBy } from '../filterOptions/index'
import { toStartCase } from '../helper'
import { countryCode, Countries } from '../filterOptions/countryCode'

interface Props {
  searchText: string
}

export type FilterState = {
  genres: string[]
  tags: string[]
  year: string
  season: string
  format: string[]
  status: string
  country: string
  source: string
}

type FilterStateKeys = keyof FilterState

export const initialState: FilterState = {
  // first letter of genres must be capital
  genres: ['Fantasy', 'Drama'],
  tags: [],
  year: '',
  season: '',
  format: [],
  status: '',
  country: '',
  source: '',
}

const SearchResult = ({ searchText }: Props) => {
  const [filterState, setFilterState] = useState(initialState)
  const [sortBy, setSortBy] = useState<SortBy>('POPULARITY_DESC')
  const [data, setData] = useState<QueryData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  // TODO: add sorting logic
  // TODO: use recoil
  const queryVariables: QueryVar = useMemo(
    () => ({
      ...Object.fromEntries(
        Object.entries(filterState).filter(([_, value]) => value.length > 0)
      ),
      sortBy,
      searchText: searchText ? searchText : null,
      country: countryCode[filterState.country as Countries],
    }),
    [filterState, sortBy, searchText]
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
    if (!data || !data.Page.pageInfo.hasNextPage || loading) {
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
      Object.entries(filterOptions).map(([key, value]) => ({
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
    []
  )

  return (
    <Wrapper>
      <DropDowns>
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
      </DropDowns>
      {!error && (
        <Result
          loading={loading}
          media={data?.Page.media}
          setFilterState={setFilterState}
        />
      )}
      <ScrollButton />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-top: 2rem;
  padding: 0 8rem;
`

const DropDowns = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export default SearchResult
