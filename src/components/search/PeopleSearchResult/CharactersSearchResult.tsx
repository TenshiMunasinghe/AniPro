import React from 'react'
import { useLocation } from 'react-router-dom'
import gqlRequestClient from '../../../api/graphqlClient'
import {
  SearchCharactersQueryVariables,
  useSearchCharactersQuery,
} from '../../../generated/index'
import PeopleGrid from '../PeopleGrid/PeopleGrid'

export type PeopleHeading = { text: string; link: string }

interface Props extends Omit<SearchCharactersQueryVariables, 'search'> {
  heading?: PeopleHeading
}

const CharactersSearchResult = (props: Props) => {
  const { heading, ...queryVar } = props
  const location = useLocation()
  const search = new URLSearchParams(location.search).get('searchText')

  const { data, isLoading } = useSearchCharactersQuery(gqlRequestClient, {
    ...queryVar,
    search: search || null,
  })

  return (
    <PeopleGrid
      people={data?.Page?.characters}
      heading={
        heading && { text: heading.text, link: heading.link + location.search }
      }
      isLoading={isLoading}
    />
  )
}

export default CharactersSearchResult
