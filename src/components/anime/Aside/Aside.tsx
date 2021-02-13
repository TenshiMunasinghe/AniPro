import React from 'react'
import { Common } from '../../../api/types'

interface Props {
  nextAringEpisode: Common['nextAiringEpisode']
  format: Common['format']
  episodes: Common['episodes']
  duration: Common['duration']
  status: Common['status']
  startDate: Common['startDate']
  season: Common['season']
  meanScore: Common['meanScore']
  popularity: Common['popularity']
  favourites: Common['favourites']
  studios: Common['studios']
  source: Common['source']
  hashtag: Common['hashtag']
  genres: Common['genres']
  title: Common['title']
  synonyms: Common['synonyms']
}

export const Aside = (props: Props) => {
  return <div></div>
}
