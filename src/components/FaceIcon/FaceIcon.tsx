import React from 'react'
import { FaFrown, FaMeh, FaSmile, FaSmileBeam } from 'react-icons/fa'

import styles from './FaceIcon.module.scss'

interface Props {
  meanScore: number
}

const FaceIcon = ({ meanScore }: Props) => {
  if (meanScore < 50) {
    return <FaFrown className={styles.frown} />
  }

  if (meanScore < 70) {
    return <FaMeh className={styles.meh} />
  }

  if (meanScore < 80) {
    return <FaSmile className={styles.smile} />
  }

  return <FaSmileBeam className={styles.smileBeam} />
}

export default FaceIcon
