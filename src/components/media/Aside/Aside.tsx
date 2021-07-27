import classnames from 'classnames'
import { Common } from '../../../api/types'
import { airingInfo } from '../../../utils/airingInfo'
import { convertTime } from '../../../utils/convertTIme'
import { formatLabel } from '../../../utils/formatLabel'
import { timeToArr } from '../../../utils/timeToArr'
import { timeToStr } from '../../../utils/timeToStr'
import { toStartCase } from '../../../utils/toStartCase'
import styles from './Aside.module.scss'

interface Props {
  data: Common
}

interface Content {
  label: string
  text: (prop: Common) => string
  isActive?: boolean
}

const dateFormat = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
}

const contents: Content[] = [
  {
    label: 'Airing',
    text: ({ nextAiringEpisode }) =>
      nextAiringEpisode
        ? airingInfo({
            nextAiringEpisode: nextAiringEpisode,
            season: null,
            seasonYear: null,
          })
        : '',
    isActive: true,
  },
  {
    label: 'Format',
    text: ({ format }) => formatLabel(format || ''),
  },
  {
    label: 'Episodes',
    text: ({ episodes }) => episodes?.toString() || '',
  },
  {
    label: 'Episode Duration',
    text: ({ duration, format }) =>
      duration
        ? timeToStr(
            timeToArr(
              convertTime({
                num: duration,
                input: 'minutes',
                output: format === 'MOVIE' ? ['hours', 'minutes'] : ['minutes'],
              })
            )
          )
        : '',
  },
  {
    label: 'Status',
    text: ({ status }) => toStartCase(status || ''),
  },
  {
    label: 'Start Date',
    text: ({ startDate }) => {
      return startDate
        ? new Date(
            startDate.year,
            startDate.month - 1,
            startDate.day
          ).toLocaleDateString('en-US', dateFormat)
        : ''
    },
  },
  {
    label: 'End Date',
    text: ({ endDate }) =>
      endDate
        ? new Date(
            endDate.year,
            endDate.month - 1,
            endDate.day
          ).toLocaleDateString('en-US', dateFormat)
        : '',
  },
  {
    label: 'Season',
    text: ({ season, seasonYear }) =>
      season && seasonYear
        ? `${toStartCase(season)} ${seasonYear.toString()}`
        : '',
  },
  {
    label: 'Average Score',
    text: ({ meanScore }) => (meanScore ? `${meanScore.toString()}%` : ''),
  },
  {
    label: 'Popularity',
    text: ({ popularity }) => popularity?.toString() || '',
  },
  {
    label: 'Favorites',
    text: ({ favourites }) => favourites?.toString() || '',
  },
  {
    label: 'Studios',
    text: ({ studios }) => studios.nodes[0]?.name || '',
  },
  {
    label: 'Source',
    text: prop => toStartCase(prop.source || ''),
  },
  {
    label: 'Hashtag',
    text: ({ hashtag }) => hashtag || '',
  },
  {
    label: 'Genres',
    text: ({ genres }) => genres?.join(',') || '',
  },
  {
    label: 'Romaji',
    text: ({ title }) => title?.romaji || '',
  },
  {
    label: 'English',
    text: ({ title }) => title?.english || '',
  },
  {
    label: 'Native',
    text: ({ title }) => title?.native || '',
  },
  {
    label: 'Synonyms',
    text: ({ synonyms }) => synonyms?.join(' ') || '',
  },
]

const Aside = ({ data }: Props) => {
  return (
    <aside className={styles.container}>
      {contents.map(
        content =>
          content.text(data) && (
            <div
              className={classnames(
                { [styles.active]: content.isActive },
                styles.item
              )}
              key={content.label}>
              <div className={styles.label}>{content.label}</div>
              <div className={styles.info}>{content.text(data)}</div>
            </div>
          )
      )}
    </aside>
  )
}

export default Aside
