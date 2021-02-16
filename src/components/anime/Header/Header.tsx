import React, { CSSProperties } from 'react'
import htmr from 'htmr'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import styles from './Header.module.scss'
import { Common } from '../../../api/types'
import FluidText from '../../common/FluidText/FluidText'

interface Props {
  bannerImg: Common['bannerImage']
  coverImg: Common['coverImage']['large']
  title: Common['title']['romaji']
  description: Common['description']
}

const Header = ({ bannerImg, coverImg, title, description }: Props) => {
  const style = {
    '--banner-image': `url(${bannerImg})`,
  } as CSSProperties
  return (
    <header className={styles.wrapper} style={style}>
      <div className={styles.details}>
        <figure className={styles.cover}>
          <LazyLoadImage src={coverImg} alt={title} />
        </figure>
        <FluidText
          as='h1'
          min={0.8}
          max={2.5}
          resolution={0.05}
          className={styles.title}>
          {title}
        </FluidText>
      </div>
      <p className={styles.description}>{htmr(description)}</p>
    </header>
  )
}

export default Header
