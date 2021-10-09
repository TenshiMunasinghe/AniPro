import { memo, useState } from 'react'
import { createColorVariable } from '../../../../utils/createColorVariable'
import { Media } from '../../CardGrid/CardGrid'
import styles from './CardCover.module.scss'
import Content from './Content/Content'
import Popover from './Popover/Popover'

interface Props {
  index: number
  rank?: number | null
  media: Media
}

const CardCover = ({ index, rank, media }: Props) => {
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
      <Popover index={index} isVisible={isPopoverVisible} media={media} />
    </div>
  )
}

export default memo(CardCover)
