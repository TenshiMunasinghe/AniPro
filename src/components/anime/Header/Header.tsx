import React, { CSSProperties } from 'react'
import htmr from 'htmr'
import { FaPlay } from 'react-icons/fa'

import styles from './Header.module.scss'
import { Common } from '../../../api/types'

interface Props {
  bannerImg: Common['bannerImage']
  coverImg: Common['coverImage']
  title: Common['title']['romaji']
  description: Common['description']
  streamUrl: Common['streamingEpisodes'][number]['url']
}

const Header = ({
  bannerImg,
  coverImg,
  title,
  description,
  streamUrl,
}: Props) => {
  const style = {
    '--banner-image': `url(${bannerImg})`,
    '--bg-color': coverImg.color,
  } as CSSProperties
  return (
    <header className={styles.wrapper} style={style}>
      <div className={styles.banner} />
      <div className={styles.details}>
        <figure className={styles.cover}>
          <img src={coverImg.large} alt={title + ' cover'} />
        </figure>
        <a href={streamUrl} target='blank' className={styles.watch}>
          <span className={styles.text}>Watch </span>
          <FaPlay />
        </a>
      </div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{htmr(description)}</p>
    </header>
  )
}

export default Header
