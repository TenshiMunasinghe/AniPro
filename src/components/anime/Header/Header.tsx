import React from 'react'
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
  return (
    <header className={styles.wrapper}>
      <figure className={styles.banner}>
        <Image src={bannerImg} alt={title} />
      </figure>
      <div className={styles.details}>
        <figure className={styles.cover}>
          <img src={coverImg} alt={title} />
        </figure>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{htmr(description)}</p>
      </div>
    </header>
  )
}
