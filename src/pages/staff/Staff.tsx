import React from 'react'
import { useParams } from 'react-router-dom'
import gqlRequestClient from '../../api/graphqlClient'
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner'
import NavBar from '../../components/common/NavBar/NavBar'
import Footer from '../../components/home/Footer/Footer'
import Header from '../../components/person/Header/Header'
import Medias from '../../components/staff/Medias/Medias'
import { useStaffInfoQuery } from '../../generated/index'
import styles from '../personPage.module.scss'

const Staff = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useStaffInfoQuery(gqlRequestClient, {
    id: parseInt(id),
  })

  if (isLoading) return <LoadingSpinner />

  if (!data || !data.Staff) return null

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <Header data={data?.Staff} />
        <Medias />
      </div>
      <Footer />
    </>
  )
}

export default Staff
