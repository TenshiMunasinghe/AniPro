import React, { CSSProperties } from 'react'
import htmr from 'htmr'

import styles from './Header.module.scss'
import { Common } from '../../../api/types'
import { Image } from '../../common/Image/Image'

interface Props {
  bannerImg: Common['bannerImage']
  coverImg: Common['coverImage']['extraLarge']
  title: Common['title']['romaji']
  description: Common['description']
}

export const Header = ({ bannerImg, coverImg, title, description }: Props) => {
  const style = { '--banner-image': `url(${bannerImg})` } as CSSProperties
  return (
    <header className={styles.wrapper} style={style}>
      <div className={styles.details}>
        <figure className={styles.cover}>
          <Image src={coverImg} alt={title} />
        </figure>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <p className={styles.description}>{htmr(description)}</p>
    </header>
  )
}
