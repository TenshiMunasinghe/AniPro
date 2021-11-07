import { memo, useState } from 'react'
import { DeepPartial } from 'react-hook-form'
import { Media } from '../../../../generated'
import { createColorVariable } from '../../../../utils/createColorVariable'
import styles from './CardCover.module.scss'
import Content from './Content/Content'
import Popover from './Popover/Popover'

interface Props {
  index: number
  rank?: number | null
  media: DeepPartial<Media>
  hasPopover?: boolean
}

const CardCover = ({ index, rank, media, hasPopover = true }: Props) => {
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
        media.coverImage?.color || 'var(--color-foreground-200)'
      )}>
      <Content rank={rank} media={media} />
      {hasPopover && (
        <Popover index={index} isVisible={isPopoverVisible} media={media} />
      )}
    </div>
  )
}

export default memo(CardCover)
