import { memo, useState } from 'react'
import { DeepPartial } from 'react-hook-form'
import { imageSize } from '../../../../api/queries'
import { linkToMediaPage } from '../../../../App'
import { Media, MediaType } from '../../../../generated'
import { createColorVariable } from '../../../../utils/createColorVariable'
import { ImageSize } from '../../CardGrid/CardGrid'
import Content from './Content/Content'
import Popover from './Popover/Popover'

export interface CardCoverContent {
  link?: string
  image?: string | null
  title?: string | null
}

export interface CardCoverProps {
  index: number
  rank?: number | null
  media: DeepPartial<Media> | null | undefined
  hasPopover?: boolean
  imageSize: ImageSize
  subContent?: { link?: string; image?: string | null; title?: string | null }
}

const CardCover = ({
  index,
  rank,
  media,
  hasPopover = true,
  subContent,
}: CardCoverProps) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)
  const showPopover = () => setIsPopoverVisible(true)
  const hidePopover = () => setIsPopoverVisible(false)

  if (!media) return null

  return (
    <div
      className='relative'
      onMouseOver={showPopover}
      onMouseLeave={hidePopover}
      onFocus={showPopover}
      onBlur={hidePopover}
      style={createColorVariable(media.coverImage?.color)}>
      <Content
        rank={rank}
        main={{
          link: linkToMediaPage(media.id, media.type || MediaType.Anime),
          title: media.title?.romaji,
          image: media.coverImage?.[imageSize],
        }}
        sub={subContent}
      />
      {hasPopover && (
        <Popover index={index} isVisible={isPopoverVisible} media={media} />
      )}
    </div>
  )
}

export default memo(CardCover)
