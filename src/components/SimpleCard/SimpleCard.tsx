import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './SimpleCard.module.scss'
import Image from '../Image/Image'
import Popover from '../Popover/Popover'
import { imageSize } from '../../graphql/queries'

interface Props {
  id: number
  image: {
    [key: string]: string
    color: string
  }
  title: {
    english: string
    romaji: string
  }
  genres: string[]
  status: string
  nextAiring: {
    timeUntilAiring: number
    episode: number
  } | null
}

const SimpleCard = ({ image, title, id }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)
  const handleMouseOver = () => setIsPopoverVisible(true)
  const handleMouseLeave = () => setIsPopoverVisible(false)
  const url = `/anime/${id}`
  return (
    <div
      className={styles.popoverWrapper}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}>
      <article className={styles.wrapper}>
        <Link
          to={url}
          style={{ background: image.color }}
          className={
            styles.imageWrapper + ' ' + styles[isLoaded ? 'loaded' : 'loading']
          }>
          <Image
            className={styles.image}
            onLoad={() => setIsLoaded(true)}
            src={image[imageSize]}
            alt={title.romaji}
          />
        </Link>
        <h5 className={styles.title}>
          <Link to={url}>{title.romaji}</Link>
        </h5>
      </article>

      <Popover isVisible={isPopoverVisible} />
    </div>
  )
}

export default React.memo(SimpleCard)
