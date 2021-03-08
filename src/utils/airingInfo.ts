import { SearchResult } from '../api/types'
import { convertTime } from './convertTIme'
import { pluralize } from './pluralize'
import { timeToArr } from './timeToArr'
import { toStartCase } from './toStartCase'

export const airingInfo = ({
  nextAiringEpisode,
  season,
  seasonYear,
}: {
  nextAiringEpisode: SearchResult['nextAiringEpisode']
  season: SearchResult['season']
  seasonYear: SearchResult['seasonYear']
}) => {
  if (!nextAiringEpisode && season && seasonYear) {
    return `${toStartCase(season)} ${seasonYear}`
  } else if (nextAiringEpisode) {
    const timeUntilAiring = timeToArr(
      convertTime({
        num: nextAiringEpisode.timeUntilAiring,
        input: 'seconds',
        output: ['weeks', 'days', 'hours', 'minutes'],
      })
    ).shift()

    return timeUntilAiring && timeUntilAiring.num !== undefined
      ? `Episode ${nextAiringEpisode.episode} airing in ${pluralize(
          timeUntilAiring.num,
          timeUntilAiring.unit.slice(0, -1)
        )}`
      : ''
  }

  return ''
}
