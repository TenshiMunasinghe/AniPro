import LoadingSpinner from '../common/LoadingSpinner'
import NavBar from '../common/NavBar'
import PageWrapper from '../common/PageWrapper'
import Header, { PersonPageHeaderData } from './Header/Header'

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
      <PageWrapper className='space-y-4 overflow-x-hidden pt-0'>
        <Header data={headerContent} />
        <main className='flex flex-col justify-center space-y-5'>
          <MainContent />
        </main>
      </PageWrapper>
    </>
  )
}

export default PageContent
