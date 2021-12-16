import React, { memo } from 'react'
import { linkToMediaPage } from '../../../../../App'
import { MediaType } from '../../../../../generated'
import CoverImage from '../../../CoverImage/CoverImage'
import Title from '../../../Title/Title'
import Rank from '../../components/Rank/Rank'
import { CardCoverProps } from '../CardCover'
import styles from './Content.module.scss'

const Content = ({
  media,
  rank,
  imageSize,
  subContent,
}: Omit<CardCoverProps, 'index' | 'hadPopover'>) => {
  if (!media) return null

  const { id, coverImage, title, type } = media

  return (
    <article className={styles.container}>
      {rank && (
        <div className={styles.rank}>
          <Rank rank={rank} />
        </div>
      )}
      <div className={styles.images}>
        <figure className={styles.cover}>
          <CoverImage
            link={linkToMediaPage(id, type || MediaType.Anime)}
            src={coverImage?.[imageSize]}
            title={title?.romaji || 'no title'}
          />
        </figure>
        {subContent && (
          <figure className={styles.subContent}>
            <CoverImage
              link={subContent.link}
              src={subContent.image}
              title={subContent.title || 'no name'}
            />
          </figure>
        )}
      </div>
      <Title id={id} text={title?.romaji || 'no title'} type={type || null} />
    </article>
  )
}

export default memo(Content)
