import NavBar from '../../components/common/NavBar/NavBar'
import Slider from '../../components/home/Slider/Slider'
import MediaHome from '../../components/search/Media/Home'
import { MediaType } from '../../generated'
import { useMediaHomeContent } from '../../hooks/useMediaHomeContent'
import styles from './Home.module.scss'

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
      <main className={styles.content}>
        <MediaHome type={MediaType.Anime} />
        <MediaHome type={MediaType.Manga} />
      </main>
    </>
  )
}

export default Home
