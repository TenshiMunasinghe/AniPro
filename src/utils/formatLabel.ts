import { MediaSort } from '../generated/index'
import { toStartCase } from './toStartCase'

export const formatLabel = (str: string) => {
  const specialCase: { [key: string]: string } = {
    OVA: 'OVA',
    ONA: 'ONA',
    TV_SHORTS: 'TV Shorts',
    TV: 'TV Show',
    [MediaSort.TrendingDesc]: 'Trending',
    [MediaSort.PopularityDesc]: 'Popularity',
    [MediaSort.ScoreDesc]: 'Average Score',
    [MediaSort.FavouritesDesc]: 'Favourites',
    [MediaSort.StartDateDesc]: 'Newest',
  }

  return specialCase[str] ? specialCase[str] : toStartCase(str)
}
