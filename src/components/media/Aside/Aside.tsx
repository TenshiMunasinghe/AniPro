import { CommonQuery } from '../../../generated/index'
import { airingInfo } from '../../../utils/airingInfo'
import { convertTime } from '../../../utils/convertTIme'
import { formatLabel } from '../../../utils/formatLabel'
import { timeToArr } from '../../../utils/timeToArr'
import { timeToStr } from '../../../utils/timeToStr'
import { toStartCase } from '../../../utils/toStartCase'
import Ranking from '../Ranking/Ranking'
import styles from './Aside.module.scss'
import Item from './Item/Item'
import Tags from './Tags/Tags'

interface Props {
  data: CommonQuery['Media']
}

const dateFormat = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
}

const Aside = ({ data }: Props) => {
  if (!data) return null

  return (
    <aside className={styles.container}>
      {data.rankings?.length && (
        <section className={styles.rankings}>
          {data.rankings
            .filter(ranking => ranking?.allTime)
            .map(ranking => (
              <Ranking key={'common' + ranking?.id} ranking={ranking} />
            ))}
        </section>
      )}
      <section className={styles.infos}>
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
          {data.startDate?.year
            ? new Date(
                data.startDate.year,
                data.startDate.month || 0 - 1,
                data.startDate.day || 0
              ).toLocaleDateString('en-US', dateFormat)
            : ''}
        </Item>

        <Item label='End Date'>
          {data.endDate?.year
            ? new Date(
                data.endDate.year,
                data.endDate?.month || 0 - 1,
                data.endDate?.day || 0
              ).toLocaleDateString('en-US', dateFormat)
            : ''}
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

      {data?.tags?.length && (
        <div className={styles.tags}>
          <Tags tags={data.tags} />
        </div>
      )}
    </aside>
  )
}

export default Aside
