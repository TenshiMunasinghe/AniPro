import { useMemo } from 'react'
import { CommonQuery } from '../../../generated/index'
import { airingInfo } from '../../../utils/airingInfo'
import { convertTime } from '../../../utils/convertTIme'
import { formatDate } from '../../../utils/formatDate'
import { formatLabel } from '../../../utils/formatLabel'
import { timeToArr } from '../../../utils/timeToArr'
import { timeToStr } from '../../../utils/timeToStr'
import { toStartCase } from '../../../utils/toStartCase'
import Ranking from '../Ranking'
import Item from './Item'
import Tags from './Tags'

interface Props {
  data: CommonQuery['Media']
}

const Aside = ({ data }: Props) => {
  const rankings = useMemo(
    () => data?.rankings?.filter(ranking => ranking?.allTime),
    [data?.rankings]
  )

  if (!data) return null

  return (
    <aside className='flex w-full flex-col space-y-5 overflow-x-hidden'>
      {!!rankings?.length && (
        <section className='hidden space-y-5 xl:block'>
          {rankings.map(ranking => (
            <Ranking key={'common' + ranking?.id} ranking={ranking} />
          ))}
        </section>
      )}
      <section className='flex space-x-6 overflow-x-auto bg-zinc-100 py-4 px-5 dark:bg-zinc-700 lg:h-min lg:flex-col lg:space-x-0 lg:space-y-4'>
        <Item label='Airing'>
          {data.nextAiringEpisode
            ? airingInfo({
                nextAiringEpisode: data.nextAiringEpisode,
                season: null,
                seasonYear: null,
              })
            : ''}
        </Item>

        <Item label='Format'>{formatLabel(data.format || '')}</Item>

        <Item label='Episodes'>{data.episodes?.toString() || ''}</Item>

        <Item label='Chapters'>{data.chapters?.toString() || ''}</Item>

        <Item label='Volumes'>{data.volumes?.toString() || ''}</Item>

        <Item label='Episode Duration'>
          {data.duration
            ? timeToStr(
                timeToArr(
                  convertTime({
                    num: data.duration,
                    input: 'minutes',
                    output:
                      data.format === 'MOVIE'
                        ? ['hours', 'minutes']
                        : ['minutes'],
                  })
                )
              )
            : ''}
        </Item>

        <Item label='Status'>{toStartCase(data.status || '')}</Item>

        <Item label='Start Date'>
          {data.startDate ? formatDate(data.startDate) : ''}
        </Item>

        <Item label='End Date'>
          {data.endDate ? formatDate(data.endDate) : ''}
        </Item>

        <Item label='Season'>
          {data.season && data.seasonYear
            ? `${toStartCase(data.season)} ${data.seasonYear.toString()}`
            : ''}
        </Item>

        <Item label='Average Score'>
          {data.meanScore ? `${data.meanScore.toString()}%` : ''}
        </Item>

        <Item label='Popularity'>{data.popularity?.toString() || ''}</Item>

        <Item label='Favorites'>{data.favourites?.toString() || ''}</Item>

        <Item label='Studios'>{data.studios?.nodes?.[0]?.name || ''}</Item>

        <Item label='Source'>{toStartCase(data.source || '')}</Item>

        <Item label='Hashtag'>{data.hashtag || ''}</Item>

        <Item label='Genres'>{data.genres?.join(', ') || ''}</Item>

        <Item label='Romaji'>{data.title?.romaji || ''}</Item>

        <Item label='English'>{data.title?.english || ''}</Item>

        <Item label='Native'>{data.title?.native || ''}</Item>

        <Item label='Synonyms'>{data.synonyms?.join(' ') || ''}</Item>
      </section>

      {!!data?.tags?.length && (
        <div className='hidden lg:block'>
          <Tags tags={data.tags} />
        </div>
      )}
    </aside>
  )
}

export default Aside
