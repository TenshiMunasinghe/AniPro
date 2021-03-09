import htmr from 'htmr'
import React, { CSSProperties } from 'react'
import { FaExternalLinkAlt, FaPlay } from 'react-icons/fa'

import { Common } from '../../../api/types'
import styles from './Header.module.scss'

interface Props {
  bannerImg: Common['bannerImage']
  coverImg: Common['coverImage']
  title: Common['title']['romaji']
  description: Common['description']
  streamUrl?: Common['streamingEpisodes'][number]['url']
  siteUrl?: Common['externalLinks'][number]['url']
}

const Header = ({
  bannerImg,
  coverImg,
  title,
  description,
  streamUrl,
  siteUrl,
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
        <a href={streamUrl || siteUrl} target='blank' className={styles.watch}>
          <span className={styles.text}>
            {streamUrl ? 'Watch' : 'Official Site'}
          </span>
          {streamUrl ? <FaPlay /> : <FaExternalLinkAlt />}
        </a>
      </div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.description}>
        <p className={styles.scrollWrapper}>{htmr(description)}</p>
      </div>
    </header>
  )
}

export default Header
