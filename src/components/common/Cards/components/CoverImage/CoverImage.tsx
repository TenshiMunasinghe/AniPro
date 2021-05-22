import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { linkToMediaPage } from '../../../../../App'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import styles from './CoverImage.module.scss'
import { ScrollPositionContext } from '../../../CardGrid/CardGrid'

interface Props {
  id: number
  title: string
  src: string
  color: string
}

const CoverImage = ({ id, title, src, color }: Props) => {
  const scrollPosition = useContext(ScrollPositionContext)

  const style = {
    '--color-original': color,
  } as React.CSSProperties

  return (
    <Link
      to={linkToMediaPage(id)}
      aria-label={title}
      className={styles.wrapper}
      style={style}>
      <LazyLoadImage
        src={src}
        alt={title}
        scrollPosition={scrollPosition}
        effect='opacity'
      />
    </Link>
  )
}

export default CoverImage
