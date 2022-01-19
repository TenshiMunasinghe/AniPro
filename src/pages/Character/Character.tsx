import { useParams } from 'react-router-dom'
import gqlRequestClient from '../../api/graphqlClient'
import Medias from '../../components/character/Medias/Medias'
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner'
import PageContent from '../../components/person/PageContent/PageContent'
import { useCharacterInfoQuery } from '../../generated/index'

const Character = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useCharacterInfoQuery(gqlRequestClient, {
    id: parseInt(id),
  })

  if (isLoading) return <LoadingSpinner />

  if (!data || !data.Character) return null

  return (
    <PageContent
      isLoading={isLoading}
      headerContent={data?.Character}
      MainContent={() => <Medias />}
    />
  )
}

export default Character
