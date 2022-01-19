import React from 'react'
import { useParams } from 'react-router-dom'
import gqlRequestClient from '../../api/graphqlClient'
import PageContent from '../../components/person/PageContent/PageContent'
import Medias from '../../components/staff/Medias/Medias'
import { useStaffInfoQuery } from '../../generated/index'

const Staff = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useStaffInfoQuery(gqlRequestClient, {
    id: parseInt(id),
  })

  return (
    <PageContent
      isLoading={isLoading}
      headerContent={data?.Staff}
      MainContent={() => <Medias />}
    />
  )
}

export default Staff
