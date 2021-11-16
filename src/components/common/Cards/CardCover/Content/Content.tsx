import { memo, useContext } from 'react'
import { linkToMediaPage } from '../../../../../App'
import { MediaType } from '../../../../../generated'
import { ImageSizeContext } from '../../../CardGrid/CardGrid'
import CoverImage from '../../../CoverImage/CoverImage'
import Title from '../../../Title/Title'
import Rank from '../../components/Rank/Rank'
import { CardCoverProps } from '../CardCover'
import styles from './Content.module.scss'

const Content = ({
  media,
  rank,
}: Omit<CardCoverProps, 'index' | 'hadPopover'>) => {
  const imageSize = useContext(ImageSizeContext)

  if (!media) return null

  const { id, coverImage, title, type } = media

  return (
    <article className={styles.container}>
      {rank && (
        <div className={styles.rank}>
          <Rank rank={rank} />
        </div>
      )}
      <div className={styles.image}>
        <CoverImage
          link={linkToMediaPage(id, type || MediaType.Anime)}
          src={coverImage?.[imageSize]}
          title={title?.romaji || 'no title'}
        />
      </div>
      <Title id={id} text={title?.romaji || 'no title'} type={type || null} />
    </article>
  )
}

export default memo(Content)
