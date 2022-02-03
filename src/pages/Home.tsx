import NavBar from '../components/common/NavBar'
import PageWrapper from '../components/common/PageWrapper'
import MediaHome from '../components/home/Home'
import Slider from '../components/home/Slider'
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
        queryVar={{
          ...contents.ANIME[randomKey].queryVars,
          type: MediaType.Anime,
        }}
        context={contents.ANIME[randomKey].text}
      />
      <NavBar position='sticky' />
      <PageWrapper className='relative'>
        <MediaHome type={MediaType.Anime} />
        <MediaHome type={MediaType.Manga} />
      </PageWrapper>
    </>
  )
}

export default Home
