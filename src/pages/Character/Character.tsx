import { useParams } from 'react-router-dom'
import gqlRequestClient from '../../api/graphqlClient'
import Medias from '../../components/character/Medias/Medias'
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner'
import NavBar from '../../components/common/NavBar/NavBar'
import Footer from '../../components/home/Footer/Footer'
import Header from '../../components/person/PersonPageHeader/PersonPageHeader'
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
        <Header data={data?.Character} />
        <Medias />
      </div>
      <Footer />
    </>
  )
}

export default Character
