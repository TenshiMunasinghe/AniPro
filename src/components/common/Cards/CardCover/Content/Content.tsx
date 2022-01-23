import React, { memo } from 'react'
import CoverImage from '../../../CoverImage/CoverImage'
import Title from '../../../Title'
import Rank from '../../components/Rank/Rank'
import { CardCoverContent } from '../CardCover'
import styles from './Content.module.scss'

interface Props {
  main: CardCoverContent
  sub?: CardCoverContent
  rank?: number | null
}

const Content = ({ main, sub, rank }: Props) => {
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
            link={main.link}
            src={main.image}
            title={main.title || 'no title'}
          />
        </figure>
        {sub && sub.image !== undefined && (
          <figure className={styles.subContent}>
            <CoverImage
              link={sub.link}
              src={sub.image}
              title={sub.title || 'no name'}
            />
          </figure>
        )}
      </div>
      <div className={styles.text}>
        <Title link={main.link} text={main.title || 'no title'} />
        <Title link={sub?.link || main.link} text={sub?.title || ''} />
      </div>
    </article>
  )
}

export default memo(Content)
