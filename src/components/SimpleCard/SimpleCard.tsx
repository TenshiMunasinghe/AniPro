import React, { useState } from 'react'

import styles from './SimpleCard.module.scss'
import { trimText } from '../../helper'
import Image from '../Image/Image'

interface Props {
  id: number
  image: string
  title: {
    native: string
    romaji: string
  }
  genres: string[]
  status: string
  nextAiring: {
    timeUntilAiring: number
    episode: number
  } | null
}

const SimpleCard = ({ image, title }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  return (
    <article className={styles.wrapper}>
      <Image
        className={styles.image + ' ' + styles[isLoaded ? 'loaded' : 'loading']}
        onLoad={() => setIsLoaded(true)}
        src={image}
        alt={title.romaji}
      />
      <h5 className={styles.title}>{trimText(title.romaji, 40)}</h5>
    </article>
  )
}

export default React.memo(SimpleCard)
