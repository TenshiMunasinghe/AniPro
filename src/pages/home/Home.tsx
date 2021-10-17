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
import breakpoints from '../../css/breakpoints.module.scss'
import { MediaTypes } from '../../filterOptions/filterOptions'
import { MediaSort } from '../../generated'
import { MediaSearchQueryVariables } from '../../generated/index'
import { useWindowSizeStore, WindowSizeStore } from '../../zustand/stores'
import { CardType } from '../search/Search'
import styles from './Home.module.scss'

type HomeContents<T> = {
  anime: {
    [key: string]: T
  }
  manga: {
    [key: string]: T
  }
}

const queryVars: HomeContents<MediaSearchQueryVariables> = {
  anime: {
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

    topRated: { sortBy: MediaSort.ScoreDesc, perPage: 10 },
  },
  manga: {
    trending: { sortBy: MediaSort.TrendingDesc },
    popularNow: {
      sortBy: MediaSort.PopularityDesc,
    },
    topRated: {
      sortBy: MediaSort.ScoreDesc,
      perPage: 10,
    },
  },
}

const windowSizeStoreSelector = ({ width }: WindowSizeStore) => width

const Home = () => {
  const windowWidth = useWindowSizeStore(windowSizeStoreSelector)

  const isLargeScreen = windowWidth >= parseInt(breakpoints.sm)

  const contents: HomeContents<{
    text: string
    cardType?: CardType
    hasRank?: boolean
  }> = {
    anime: {
      trending: {
        text: 'Trending Animes',
      },

      popularNow: {
        text: 'Popular This Season',
      },

      upComing: {
        text: 'Upcoming Next Season',
      },

      popularAllTime: {
        text: 'All Time Popular Animes',
      },

      topRated: {
        text: 'Top Animes',
        cardType: isLargeScreen ? 'table' : 'cover',
        hasRank: true,
      },
    },
    manga: {
      trending: { text: 'Trending Manga' },
      popularNow: {
        text: 'Popular Manga',
      },
      topRated: {
        text: 'Top Manga',
        cardType: isLargeScreen ? 'table' : 'cover',
        hasRank: true,
      },
    },
  }

  const contentsKey = Object.keys(
    queryVars.anime
  ) as (keyof typeof queryVars.anime)[]
  const randomKey = contentsKey[(contentsKey.length * Math.random()) << 0]

  return (
    <>
      <Slider
        queryVar={queryVars.anime[randomKey]}
        context={contents.anime[randomKey].text}
      />
      <NavBar position='sticky' />
      <main className={styles.content}>
        {(['anime', 'manga'] as const).map(type =>
          Object.keys(queryVars[type]).map(key => (
            <Content
              key={key}
              content={contents[type][key]}
              queryVar={{
                ...queryVars[type][key],
                perPage:
                  queryVars[type][key].perPage || (isLargeScreen ? 6 : 10),
                type: MediaTypes[type],
              }}
            />
          ))
        )}
      </main>
      <Footer />
    </>
  )
}

export default Home
