import { memo, useContext, useState } from 'react'
import { NO_IMAGE_URL } from '../../../../api/queries'
import { createColorVariable } from '../../../../utils/createColorVariable'
import { ImageSizeContext, Media } from '../../CardGrid/CardGrid'
import CoverImage from '../../CoverImage/CoverImage'
import Title from '../../Title/Title'
import Rank from '../components/Rank/Rank'
import styles from './CardCover.module.scss'
import Popover from './Popover/Popover'

interface Props {
  index: number
  rank?: number | null
  media: Media
}

const CardCover = ({
  index,
  rank,
  media: {
    coverImage,
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
  },
}: Props) => {
  const imageSize = useContext(ImageSizeContext)
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
      style={createColorVariable(
        coverImage?.color || 'var(--color-foreground-200)'
      )}>
      <article className={styles.container}>
        {rank && (
          <div className={styles.rank}>
            <Rank rank={rank} />
          </div>
        )}
        <CoverImage
          id={id}
          src={coverImage?.[imageSize] || NO_IMAGE_URL}
          title={title?.romaji || 'no title'}
        />
        <Title id={id} text={title?.romaji || 'no title'} />
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
