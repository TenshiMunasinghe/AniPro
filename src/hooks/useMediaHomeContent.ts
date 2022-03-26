import { useMemo } from 'react'
import {
  currentSeason,
  currentYear,
  nextSeason,
  nextYear,
} from '../api/queries'
import { CardType } from '../components/search/MediaSearchResult'
import { MediaSearchQueryVariables, MediaSort, MediaType } from '../generated'
import { useWindowSizeStore, WindowSizeStore } from '../zustand/stores'

type Content = {
  queryVars: MediaSearchQueryVariables
  text: string
  cardType?: CardType
  hasRank?: boolean
}

type HomeContents = {
  [MediaType.Anime]: { [key: string]: Content }
  [MediaType.Manga]: { [key: string]: Content }
}

const windowSizeStoreSelector = ({ width }: WindowSizeStore) => width

export const useMediaHomeContent = () => {
  const windowWidth = useWindowSizeStore(windowSizeStoreSelector)

  const isLargeScreen = windowWidth >= 640

  const contents: HomeContents = useMemo(
    () => ({
      [MediaType.Anime]: {
        trending: {
          queryVars: { sortBy: MediaSort.TrendingDesc },
          text: 'Trending Animes',
        },

        popularNow: {
          queryVars: {
            sortBy: MediaSort.PopularityDesc,
            year: currentYear,
            season: currentSeason,
          },
          text: 'Popular This Season',
        },

        upComing: {
          queryVars: {
            year: nextYear,
            season: nextSeason,
            sortBy: MediaSort.TrendingDesc,
          },
          text: 'Upcoming Next Season',
        },

        popularAllTime: {
          queryVars: { sortBy: MediaSort.PopularityDesc },
          text: 'All Time Popular Animes',
        },

        topRated: {
          queryVars: { sortBy: MediaSort.ScoreDesc, perPage: 10 },
          text: 'Top Animes',
          cardType: isLargeScreen ? 'table' : 'cover',
          hasRank: true,
        },
      },
      [MediaType.Manga]: {
        trending: {
          queryVars: { sortBy: MediaSort.TrendingDesc },
          text: 'Trending Manga',
        },
        popularNow: {
          queryVars: { sortBy: MediaSort.PopularityDesc },
          text: 'Popular Manga',
        },
        topRated: {
          queryVars: { sortBy: MediaSort.ScoreDesc, perPage: 10 },
          text: 'Top Manga',
          cardType: isLargeScreen ? 'table' : 'cover',
          hasRank: true,
        },
      },
    }),
    [isLargeScreen]
  )

  return { contents, isLargeScreen }
}
