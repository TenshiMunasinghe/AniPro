import React, { useState, useMemo, useEffect, useRef } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import ky from 'ky'

import {
  QueryData,
  QueryVar,
  getsearchResult,
  imageSize,
} from '../graphql/queries'
import Card from '../components/Card'
import Select from '../components/Select'
import ScrollButton from '../components/ScrollButton'
import CardLoading from '../components/CardLoading'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import { filterOptions, SortBy } from '../filterOptions'

interface Props {
  searchText: string
}

type FilterState = {
  genres: string[]
  year: string
  season: string
  format: string[]
  status: string
  country: string
  source: string
}

type FilterStateKeys = keyof FilterState

const initialState: FilterState = {
  // first letter of genres must be capital
  genres: ['Fantasy', 'Drama'],
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

  // TODO: add country code logic
  // TODO: refactor nulls to [] and ''
  const queryVariables = useMemo(
    () => ({
      ...Object.fromEntries(
        Object.entries(filterState).filter(([key, value]) => value.length > 0)
      ),
      sortBy,
    }),
    [filterState, sortBy]
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res: { data: QueryData } = await ky
          .post('https://graphql.anilist.co', {
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
          .post('https://graphql.anilist.co', {
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
          const next = { ...prev }
          next.Page.pageInfo.currentPage = res.data.Page.pageInfo.currentPage
          next.Page.pageInfo.hasNextPage = res.data.Page.pageInfo.hasNextPage
          next.Page.media = _.uniqBy(
            [...next.Page.media, ...res.data.Page.media],
            'id'
          )
          return next as QueryData
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
          setData(null)
          setFilterState(prev => ({
            ...prev,
            [key]: value,
          }))
        },
        isMulti: value.isMulti,
        options: value.options.map(o => ({
          value: o,
          label: o,
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
      <Slider>
        {!error &&
          data &&
          data.Page.media.map((m: any) => (
            <Card
              key={m.id}
              id={m.id}
              image={m.coverImage[imageSize]}
              title={m.title}
              genres={m.genres}
              status={m.status}
              nextAiring={m.nextAiringEpisode}
              description={m.description}
            />
          ))}
        {loading && (
          <>
            <CardLoading />
            <CardLoading />
            <CardLoading />
          </>
        )}
      </Slider>
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

const Slider = styled.div`
  display: Grid;
  padding-top: 1rem;
`

export default SearchResult
