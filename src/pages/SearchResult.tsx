import React, { useState, useMemo, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import _ from 'lodash'

import { currentYear } from '../client'
import Card from '../components/Card'
import Select from '../components/Select'
import ScrollButton from '../components/ScrollButton'
import CardLoading from '../components/CardLoading'
import useSkip from '../hooks/useSkip'
import useInfiniteScroll from '../hooks/useInfiniteScroll'

interface Props {
  searchText: string
}

const filterOptions = {
  genres: {
    options: [
      'Action',
      'Adventure',
      'Comedy',
      'Drama',
      'Ecchi',
      'Fantasy',
      'Hentai',
      'Horror',
      'Mahou Shoujo',
      'Mecha',
      'Music',
      'Mystery',
      'Psychological',
      'Romance',
      'Sci-Fi',
      'Slice of Life',
      'Sports',
      'Supernatural',
      'Thriller',
    ],
    isMulti: true,
  },

  year: {
    options: _.range(1970, currentYear + 1).map(y => y.toString()),
    isMulti: false,
  },

  season: {
    options: ['WINTER', 'SPRING', 'SUMMER', 'AUTUMN'],
    isMulti: false,
  },

  format: {
    options: [
      'TV',
      'TV_SHORT',
      'MOVIE',
      'SPECIAL',
      'OVA',
      'ONA',
      'MUSIC',
      'MANGA',
      'NOVEL',
      'ONE_SHOT',
    ],
    isMulti: true,
  },

  status: {
    options: ['FINISHED', 'RELEASING', 'NOT_YET_RELEASED', 'CANCELLED'],
    isMulti: false,
  },

  country: {
    options: ['Japan', 'South Korea', 'China', 'Taiwan'],
    isMulti: false,
  },

  source: {
    options: [
      'ORIGINAL',
      'MANGA',
      'LIGHT_NOVEL',
      'VISUAL_NOVEL',
      'VIDEO_GAME',
      'OTHER',
      'NOVEL',
      'DOUJINSHI',
      'ANIME',
    ],
    isMulti: false,
  },
}

type FilterStateKeys = keyof FilterState

type SortBy =
  | 'TRENDING_DESC'
  | 'POPULARITY_DESC'
  | 'SCORE_DESC'
  | 'TITLE_ROMAJI'
  | 'FAVOURITES_DESC'
  | 'EPISODES'
  | 'EPISODES_DESC'
  | 'START_DATE'
  | 'START_DATE_DESC'

type FilterState = {
  genres: string[] | null
  year: string | null
  season: string | null
  format: string[] | null
  status: string | null
  country: string | null
  source: string | null
}

const initialState: FilterState = {
  // first letter of genres must be capital
  genres: ['Fantasy', 'Drama'],
  year: null,
  season: null,
  format: null,
  status: null,
  country: null,
  source: null,
}

const imageSize = 'extraLarge'

const animeQuery = gql`
query animeQuery($pageNumber: Int, $genres: [String], $year: Int, $season: MediaSeason, $format: MediaFormat, $status: MediaStatus, $country: CountryCode, $source: MediaSource, $searchText: String, $sortBy: [MediaSort]) {
  Page(page: $pageNumber, perPage: 10) {
    pageInfo {
      lastPage
    }
    media(genre_in: $genres, seasonYear: $year, season: $season, format: $format, status: $status, countryOfOrigin: $country, source: $source, search: $searchText, sort: $sortBy) {
      id
      title {
        romaji
        native
      }
      coverImage {
        ${imageSize}
      }
      status
      genres
      description
      nextAiringEpisode {
        timeUntilAiring
        episode
      }
    }
  }
}
`

const SearchResult = ({ searchText }: Props) => {
  const [filterState, setFilterState] = useState(initialState)
  const [sortBy, setSortBy] = useState<SortBy>('POPULARITY_DESC')
  const [animes, setAnimes] = useState<any[]>([])
  const [pageNumber, setPageNumber] = useState(1)
  const { loading, data, error } = useQuery(animeQuery, {
    variables: {
      ...Object.fromEntries(
        Object.entries(filterState).filter(([k, v]) => v !== null)
      ),
      searchText: searchText ? searchText : null,
      sortBy,
      pageNumber,
    },
  })

  const lastPage = useRef<null | number>(null)
  // set lastPage as it's fetched
  useEffect(() => {
    if (loading || error) {
      return
    }
    lastPage.current = data.Page.pageInfo.lastPage
  }, [data, loading, error])

  //add animes to the array as it's fetched while filtering the duplicates by id
  useSkip(() => {
    if (loading || error) {
      return
    }
    setAnimes(prev => {
      const next = [...prev]
      next.push(...data.Page.media)
      return _.uniqBy(next, 'id')
    })
  }, [data])

  //increment the pageNumber as the user scrolls down to the bottom of the page which triggers new fetching
  useInfiniteScroll(() => {
    if ((lastPage.current && pageNumber >= lastPage.current) || loading) return
    setPageNumber(prev => prev + 1)
  })

  //generates handy object for mapping to the Select component
  const dropDowns = useMemo(
    () =>
      Object.entries(filterOptions).map(([key, value]) => ({
        key,
        onChange: (value: string | string[] | null) =>
          setFilterState(prev => ({
            ...prev,
            [key]: value,
          })),
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
        <>
          {animes.length > 0 &&
            animes.map((m: any) => (
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
        </>
        {loading && lastPage.current && pageNumber <= lastPage.current && (
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
`

const Slider = styled.div`
  display: Grid;
  padding-top: 1rem;
`

export default SearchResult
