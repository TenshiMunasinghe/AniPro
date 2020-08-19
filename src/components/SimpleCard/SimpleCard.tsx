import React from 'react'

import styles from './SimpleCard.module.scss'

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

const SimpleCard = (props: Props) => {
  return <div></div>
}

export default SimpleCard
