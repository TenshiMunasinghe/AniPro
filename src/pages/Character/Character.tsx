import { useParams } from 'react-router-dom'
import gqlRequestClient from '../../api/graphqlClient'
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner'
import NavBar from '../../components/common/NavBar/NavBar'
import PersonPageHeader from '../../components/common/PersonPageHeader/PersonPageHeader'
import { useCharacterInfoQuery } from '../../generated/index'
import styles from './Character.module.scss'

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
      </div>
    </>
  )
}

export default Character
