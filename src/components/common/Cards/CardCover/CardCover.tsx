import { memo, useState } from 'react'
import { DeepPartial } from 'react-hook-form'
import { imageSize } from '../../../../api/queries'
import { Media, Staff } from '../../../../generated'
import { createColorVariable } from '../../../../utils/createColorVariable'
import { ImageSize } from '../../CardGrid/CardGrid'
import styles from './CardCover.module.scss'
import Content from './Content/Content'
import Popover from './Popover/Popover'

export interface CardCoverProps {
  index: number
  rank?: number | null
  media: DeepPartial<Media> | null | undefined
  hasPopover?: boolean
  imageSize: ImageSize
  voiceActor?: DeepPartial<Staff> | null
}

const CardCover = ({
  index,
  rank,
  media,
  hasPopover = true,
  voiceActor,
}: CardCoverProps) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)
  const showPopover = () => setIsPopoverVisible(true)
  const hidePopover = () => setIsPopoverVisible(false)

  if (!media) return null

  return (
    <div
      className={styles.popoverWrapper}
      onMouseOver={showPopover}
      onMouseLeave={hidePopover}
      onFocus={showPopover}
      onBlur={hidePopover}
      style={createColorVariable(
        media.coverImage?.color || 'var(--color-foreground-200)'
      )}>
      <Content
        rank={rank}
        media={media}
        imageSize={imageSize}
        voiceActor={voiceActor}
      />
      {hasPopover && (
        <Popover index={index} isVisible={isPopoverVisible} media={media} />
      )}
    </div>
  )
}

export default memo(CardCover)
