import { useParams } from 'react-router-dom'
import gqlRequestClient from '../../api/graphqlClient'
import Medias from '../../components/character/Medias/Medias'
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner'
import NavBar from '../../components/common/NavBar/NavBar'
import PersonPageHeader from '../../components/common/PersonPageHeader/PersonPageHeader'
import { useCharacterInfoQuery } from '../../generated/index'
import styles from '../personPage.module.scss'

const Character = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useCharacterInfoQuery(gqlRequestClient, {
    id: parseInt(id),
  })

  if (isLoading) return <LoadingSpinner />

  if (!data || !data.Character) return null

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <PersonPageHeader data={data?.Character} />
        <Medias />
      </div>
    </>
  )
}

export default Character
