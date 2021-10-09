import { memo, useContext } from 'react'
import { NO_IMAGE_URL } from '../../../../../api/queries'
import { ImageSizeContext, Media } from '../../../CardGrid/CardGrid'
import CoverImage from '../../../CoverImage/CoverImage'
import Title from '../../../Title/Title'
import Rank from '../../components/Rank/Rank'
import styles from './Content.module.scss'

interface Props {
  media: Media
  rank?: number | null
}

const Content = ({ media: { id, coverImage, title, type }, rank }: Props) => {
  const imageSize = useContext(ImageSizeContext)

  return (
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
        type={type || null}
      />
      <Title id={id} text={title?.romaji || 'no title'} type={type || null} />
    </article>
  )
}

export default memo(Content)
