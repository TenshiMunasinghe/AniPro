import { memo, useContext } from 'react'
import { DeepPartial } from 'react-hook-form'
import { NO_IMAGE_URL } from '../../../../../api/queries'
import { linkToMediaPage } from '../../../../../App'
import { Media, MediaType } from '../../../../../generated'
import { ImageSizeContext } from '../../../CardGrid/CardGrid'
import CoverImage from '../../../CoverImage/CoverImage'
import Title from '../../../Title/Title'
import Rank from '../../components/Rank/Rank'
import styles from './Content.module.scss'

interface Props {
  media: DeepPartial<Media>
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
        link={linkToMediaPage(id, type || MediaType.Anime)}
        src={coverImage?.[imageSize] || NO_IMAGE_URL}
        title={title?.romaji || 'no title'}
      />
      <Title id={id} text={title?.romaji || 'no title'} type={type || null} />
    </article>
  )
}

export default memo(Content)
