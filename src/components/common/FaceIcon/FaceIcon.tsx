import React from 'react';
import { FaFrown, FaMeh, FaSmile, FaSmileBeam } from 'react-icons/fa';

import styles from './FaceIcon.module.scss';

interface Props {
  meanScore: number | null
}

const FaceIcon = ({ meanScore }: Props) => {
  if (meanScore === null) return <></>

  if (meanScore < 50) {
    return <FaFrown className={styles.frown} aria-label='frown' />
  }

  if (meanScore < 70) {
    return <FaMeh className={styles.meh} aria-label='meh' />
  }

  if (meanScore < 80) {
    return <FaSmile className={styles.smile} aria-label='smile' />
  }

  return <FaSmileBeam className={styles.smileBeam} aria-label='smile beam' />
}

export default FaceIcon
