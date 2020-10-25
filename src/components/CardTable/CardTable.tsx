import React from 'react'
import { Link } from 'react-router-dom'

import styles from './CardTable.module.scss'
import { Media, GenreType, currentYear } from '../../graphql/queries'
import {
  useFilterStateStore,
  FilterStateStore,
  initialFilterState,
} from '../../zustand/stores'
import { Image } from '../Image/Image'
import { Genre } from '../Genre/Genre'
import { FaceIcon } from '../FaceIcon/FaceIcon'
import { toStartCase, convertFromSeconds, airingInfo } from '../../helper'

interface Props {
  id: number
  image: Media['coverImage']
  title: Media['title']
  format: Media['format']
  season: Media['season']
  seasonYear: Media['seasonYear']
  episodes: Media['episodes']
  duration: Media['duration']
  genres: GenreType
  status: Media['status']
  studios: Media['studios']
  meanScore: Media['meanScore']
  nextAiringEpisode: Media['nextAiringEpisode']
  popularity: Media['popularity']
}

const mapStatus = (status: Media['status']) =>
  status === 'RELEASING' ? 'Airing' : toStartCase(status)

const filterStateSelector = (state: FilterStateStore) => state.setFilterState

export const CardTable = ({
  image,
  title,
  id,
  genres,
  meanScore,
  popularity,
  status,
  season,
  seasonYear,
  nextAiringEpisode,
}: Props) => {
  const setFilterState = useFilterStateStore(filterStateSelector)

  const handleSetGenre = (genre: string) => {
    setFilterState({
      ...initialFilterState,
      genres: [genre],
      sortBy: 'TRENDING_DESC',
    })
  }

  const url = `/anime/${id}`

  return (
    <article className={styles.wrapper}>
      <Image src={image.extraLarge} alt={title.romaji} />

      <div className={styles.title}>
        <Link to={url}>{title.romaji}</Link>
        <div className={styles.genres}>
          {genres.map(g => (
            <Genre
              key={g.key}
              genre={g.genre}
              onClick={() => handleSetGenre(g.genre)}
            />
          ))}
        </div>
      </div>

      <div className={styles.review}>
        {meanScore && (
          <div className={styles.score}>
            <FaceIcon meanScore={meanScore} />
            {meanScore}%
          </div>
        )}
        {popularity && (
          <div className={styles.popularity}>{popularity} users</div>
        )}
      </div>

      <div className={styles.airingInfo}>
        <div className={styles.status}>
          {status === 'RELEASING' && seasonYear !== currentYear
            ? `Airing Since ${seasonYear}`
            : mapStatus(status)}
        </div>
        <div className={styles.date}>
          {airingInfo({ nextAiringEpisode, season, seasonYear })}
        </div>
      </div>
    </article>
  )
}
