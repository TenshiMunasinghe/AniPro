import { memo } from 'react'
import { DeepPartial } from 'react-hook-form'
import { imageSize } from '../../../../api/queries'
import { linkToMediaPage } from '../../../../App'
import { Media, MediaType } from '../../../../generated'
import { useColorVariable } from '../../../../hooks/useColorVariable'
import { ImageSize } from '../../CardGrid'
import Content from './Content'
import Popover from './Popover'

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
  const colors = useColorVariable(media?.coverImage?.color)

  if (!media) return null

  return (
    <div className='group relative' style={colors}>
      <Content
        rank={rank}
        main={{
          link: linkToMediaPage(media.id, media.type || MediaType.Anime),
          title: media.title?.romaji,
          image: media.coverImage?.[imageSize],
        }}
        sub={subContent}
      />
      {hasPopover && <Popover index={index} media={media} />}
    </div>
  )
}

export default memo(CardCover)
