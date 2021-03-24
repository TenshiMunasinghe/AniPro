import classnames from 'classnames'
import React from 'react'

import { Overview } from '../../../api/types'
import { airingInfo } from '../../../utils/airingInfo'
import { convertTime } from '../../../utils/convertTIme'
import { formatLabel } from '../../../utils/formatLabel'
import { timeToArr } from '../../../utils/timeToArr'
import { timeToStr } from '../../../utils/timeToStr'
import { toStartCase } from '../../../utils/toStartCase'
import styles from './Aside.module.scss'

interface Props {
  data: Overview
}

interface Content {
  label: string
  text: (prop: Overview) => string
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
    text: ({ nextAiringEpisode }: Overview) =>
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
    text: ({ format }: Overview) => formatLabel(format || ''),
  },
  {
    label: 'Episodes',
    text: ({ episodes }: Overview) => episodes?.toString() || '',
  },
  {
    label: 'Episode Duration',
    text: ({ duration, format }: Overview) =>
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
    text: ({ status }: Overview) => toStartCase(status || ''),
  },
  {
    label: 'Start Date',
    text: ({ startDate }: Overview) => {
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
    text: ({ endDate }: Overview) =>
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
    text: ({ season, seasonYear }: Overview) =>
      season && seasonYear
        ? `${toStartCase(season)} ${seasonYear.toString()}`
        : '',
  },
  {
    label: 'Average Score',
    text: ({ meanScore }: Overview) =>
      meanScore ? `${meanScore.toString()}%` : '',
  },
  {
    label: 'Popularity',
    text: ({ popularity }: Overview) => popularity?.toString() || '',
  },
  {
    label: 'Favorites',
    text: ({ favourites }: Overview) => favourites?.toString() || '',
  },
  {
    label: 'Studios',
    text: ({ studios }: Overview) => studios.nodes[0]?.name || '',
  },
  {
    label: 'Source',
    text: (prop: Overview) => toStartCase(prop.source || ''),
  },
  {
    label: 'Hashtag',
    text: ({ hashtag }: Overview) => hashtag || '',
  },
  {
    label: 'Genres',
    text: ({ genres }: Overview) => genres?.join(',') || '',
  },
  {
    label: 'Romaji',
    text: ({ title }: Overview) => title?.romaji || '',
  },
  {
    label: 'English',
    text: ({ title }: Overview) => title?.english || '',
  },
  {
    label: 'Native',
    text: ({ title }: Overview) => title?.native || '',
  },
  {
    label: 'Synonyms',
    text: ({ synonyms }: Overview) => synonyms?.join(' ') || '',
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
