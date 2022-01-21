import React from 'react'
import { useLocation } from 'react-router-dom'
import gqlRequestClient from '../../../api/graphqlClient'
import {
  SearchStaffQueryVariables,
  useSearchStaffQuery,
} from '../../../generated'
import PeopleGrid from '../PeopleGrid/PeopleGrid'

export type PeopleHeading = { text: string; link: string }

interface Props extends Omit<SearchStaffQueryVariables, 'search'> {
  heading?: PeopleHeading
}

const StaffSearchResult = (props: Props) => {
  const { heading, ...queryVar } = props
  const location = useLocation()
  const search = new URLSearchParams(location.search).get('searchText')

  const { data, isLoading } = useSearchStaffQuery(gqlRequestClient, {
    ...queryVar,
    search: search || null,
  })

  return (
    <PeopleGrid
      people={data?.Page?.staff}
      heading={
        heading && { text: heading.text, link: heading.link + location.search }
      }
      isLoading={isLoading}
      type='staff'
    />
  )
}

export default StaffSearchResult
