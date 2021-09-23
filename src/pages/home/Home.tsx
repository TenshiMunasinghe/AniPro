import {
  currentSeason,
  currentYear,
  nextSeason,
  nextYear,
} from '../../api/queries'
import NavBar from '../../components/common/NavBar/NavBar'
import Content from '../../components/home/Content/Content'
import Footer from '../../components/home/Footer/Footer'
import Slider from '../../components/home/Slider/Slider'
import { Media, MediaSort } from '../../generated'
import { SearchResultQueryVariables } from '../../generated/index'
import { useWindowSizeStore, WindowSizeStore } from '../../zustand/stores'
import { CardType } from '../search/Search'
import styles from './Home.module.scss'

type Medias = {
  trending: Media[]
  popularNow: Media[]
  popularAllTime: Media[]
  upComing: Media[]
  topRated: Media[]
}

const queryVars: { [key in keyof Medias]: SearchResultQueryVariables } = {
  trending: { sortBy: MediaSort.TrendingDesc },

  popularNow: {
    sortBy: MediaSort.PopularityDesc,
    year: currentYear,
    season: currentSeason,
  },

  upComing: {
    year: nextYear,
    season: nextSeason,
    sortBy: MediaSort.TrendingDesc,
  },

  popularAllTime: { sortBy: MediaSort.PopularityDesc },

  topRated: { sortBy: MediaSort.ScoreDesc },
}

const windowSizeStoreSelector = ({ width }: WindowSizeStore) => width

const Home = () => {
  const windowWidth = useWindowSizeStore(windowSizeStoreSelector)

  const contents: {
    [key in keyof Medias]: {
      text: string
      cardType: CardType
      hasRank?: boolean
    }
  } = {
    trending: {
      text: 'Trending Now',
      cardType: 'cover',
    },

    popularNow: {
      text: 'Popular This Season',
      cardType: 'cover',
    },

    upComing: {
      text: 'Upcoming Next Season',
      cardType: 'cover',
    },

    popularAllTime: {
      text: 'All Time Popular',
      cardType: 'cover',
    },

    topRated: {
      text: 'Top Animes',
      cardType: windowWidth >= 600 ? 'table' : 'cover',
      hasRank: true,
    },
  }

  const contentsKey = Object.keys(queryVars) as (keyof typeof queryVars)[]
  const randomKey = contentsKey[(contentsKey.length * Math.random()) << 0]

  return (
    <>
      <Slider
        queryVar={queryVars[randomKey]}
        context={contents[randomKey].text}
      />
      <NavBar position='sticky' />
      <main className={styles.content}>
        {Object.keys(queryVars).map(k => {
          const key = k as keyof Medias

          return (
            <Content
              key={key}
              content={contents[key]}
              queryVar={queryVars[key]}
            />
          )
        })}
      </main>
      <Footer />
    </>
  )
}

export default Home
