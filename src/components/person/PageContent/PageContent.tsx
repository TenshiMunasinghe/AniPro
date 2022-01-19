import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import NavBar from '../../common/NavBar/NavBar'
import Header, { PersonPageHeaderData } from '../Header/Header'
import styles from './PageContent.module.scss'

interface Props {
  headerContent: PersonPageHeaderData
  isLoading: boolean
  MainContent: () => JSX.Element
}

const PageContent = ({ headerContent, isLoading, MainContent }: Props) => {
  if (isLoading) return <LoadingSpinner />

  if (!headerContent) return null

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <Header data={headerContent} />
        <main className={styles.main}>
          <MainContent />
        </main>
      </div>
    </>
  )
}

export default PageContent
