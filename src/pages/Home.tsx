import NavBar from '../components/common/NavBar'
import PageWrapper from '../components/common/PageWrapper'
import Footer from '../components/home/Footer/Footer'
import Slider from '../components/home/Slider'
import MediaHome from '../components/search/Media/Home'
import { MediaType } from '../generated'
import { useMediaHomeContent } from '../hooks/useMediaHomeContent'

const Home = () => {
  const { contents } = useMediaHomeContent()

  const contentsKey = Object.keys(
    contents.ANIME
  ) as (keyof typeof contents.ANIME)[]
  const randomKey = contentsKey[(contentsKey.length * Math.random()) << 0]

  return (
    <>
      <Slider
        queryVar={contents.ANIME[randomKey].queryVars}
        context={contents.ANIME[randomKey].text}
      />
      <NavBar position='sticky' />
      <PageWrapper className='relative'>
        <MediaHome type={MediaType.Anime} />
        <MediaHome type={MediaType.Manga} />
      </PageWrapper>
      <Footer />
    </>
  )
}

export default Home
