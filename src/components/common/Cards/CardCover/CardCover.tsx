import { memo, useState } from 'react'
import { FetchedMedias } from '../../../../api/types'
import { createColorVariable } from '../../../../utils/createColorVariable'
import CoverImage from '../../CoverImage/CoverImage'
import Rank from '../components/Rank/Rank'
import Title from '../components/Title/Title'
import styles from './CardCover.module.scss'
import Popover from './Popover/Popover'

interface Props {
  index: number
  id: number
  image: string
  color: string
  title: FetchedMedias['title']
  format: FetchedMedias['format']
  season: FetchedMedias['season']
  seasonYear: FetchedMedias['seasonYear']
  episodes: FetchedMedias['episodes']
  duration: FetchedMedias['duration']
  genres: FetchedMedias['genres']
  status: FetchedMedias['status']
  studios: FetchedMedias['studios']
  meanScore: FetchedMedias['meanScore']
  nextAiringEpisode: FetchedMedias['nextAiringEpisode']
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
