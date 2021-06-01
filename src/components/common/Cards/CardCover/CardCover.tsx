import { memo, useState } from 'react'

import { SearchResult } from '../../../../api/types'
import Popover from './Popover/Popover'
import styles from './CardCover.module.scss'
import Title from '../components/Title/Title'
import CoverImage from '../components/CoverImage/CoverImage'
import { createColorVariable } from '../../../../utils/createColorVariable'
import Rank from '../components/Rank/Rank'

interface Props {
  index: number
  id: number
  image: string
  color: string
  title: SearchResult['title']
  format: SearchResult['format']
  season: SearchResult['season']
  seasonYear: SearchResult['seasonYear']
  episodes: SearchResult['episodes']
  duration: SearchResult['duration']
  genres: SearchResult['genres']
  status: SearchResult['status']
  studios: SearchResult['studios']
  meanScore: SearchResult['meanScore']
  nextAiringEpisode: SearchResult['nextAiringEpisode']
  rank?: number | null
}

const CardCover = ({
  index,
  image,
  title,
  id,
  format,
  season,
  seasonYear,
  episodes,
  duration,
  genres,
  studios,
  nextAiringEpisode,
  meanScore,
  rank,
  color,
}: Props) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)
  const showPopover = () => setIsPopoverVisible(true)
  const hidePopover = () => setIsPopoverVisible(false)

  return (
    <div
      className={styles.popoverWrapper}
      onMouseOver={showPopover}
      onMouseLeave={hidePopover}
      onFocus={showPopover}
      onBlur={hidePopover}
      style={createColorVariable(color)}>
      <article className={styles.container}>
        {rank && (
          <div className={styles.rank}>
            <Rank rank={rank} />
          </div>
        )}
        <CoverImage id={id} src={image} title={title.romaji} color={color} />
        <Title id={id} text={title.romaji} />
      </article>

      <Popover
        index={index}
        isVisible={isPopoverVisible}
        genres={genres}
        nextAiringEpisode={nextAiringEpisode}
        format={format}
        season={season}
        seasonYear={seasonYear}
        episodes={episodes}
        duration={duration}
        studios={studios}
        meanScore={meanScore}
      />
    </div>
  )
}

export default memo(CardCover)
