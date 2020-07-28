import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import _ from 'lodash'

import { currentYear } from '../client'
import Card from '../components/Card'
import Dropdown from '../components/Dropdown'

interface Props {
  searchText: string
}

const imageSize = 'extraLarge'

const createFilterParam = (filterOption: string, value: string[] | string) => {
  const val = typeof value === 'object' ? JSON.stringify(value) : value
  return value.length > 0 ? `${filterOption}: ${val}` : ''
}

const filterOptions = {
  genre: {
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
    options: _.range(1970, currentYear + 1).map(num => num.toString()),
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

type FilterState = {
  genre: string[]
  year: string
  season: string
  format: string[]
  status: string
  country: string
  source: string
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

const initialState: FilterState = {
  genre: ['fantasy', 'drama'],
  year: '2020',
  season: '',
  format: [],
  status: '',
  country: '',
  source: '',
}

const SearchResult = ({ searchText }: Props) => {
  const [filterState, setFilterState] = useState(initialState)
  const [sortBy, setSortBy] = useState('TRENDING_DESC')
  console.log(filterState)

  const { genre, year, season, format, status, country, source } = filterState

  const query = gql`
  {
  Page(page: 1, perPage: 10){
    media
    (
      ${createFilterParam('genre_in', genre)}
      ${createFilterParam('seasonYear', year)}
      ${createFilterParam('season', season)}
      ${createFilterParam('format', format)}
      ${createFilterParam('search', searchText)}
      sort: ${sortBy}
    ) {
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

  const { loading, data, error } = useQuery(query)

  const dropDowns = useMemo(
    () =>
      Object.entries(filterOptions).map(([key, value]) => ({
        key,
        onChange: (value: string | string[]) =>
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
          <Dropdown
            key={d.key}
            options={d.options}
            isMulti={d.isMulti}
            onChange={d.onChange}
            selected={filterState[d.key as FilterStateKeys]}
          />
        ))}
      </DropDowns>
      {!loading && !error && (
        <Slider>
          {data.Page.media.map((m: any) => (
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
        </Slider>
      )}
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

const Heading = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

const Slider = styled.div`
  display: Grid;
  height: 25rem;
  overflow-y: scroll;
  white-space: nowrap;
  /* background: rgba(255, 255, 255, 0.08); */
  border: solid 2px rgba(255, 255, 255, 0.16);
  padding-top: 1rem;
  border-radius: 1rem;
`

export default SearchResult
