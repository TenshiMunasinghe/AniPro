import React from 'react'
import { FaCaretUp } from 'react-icons/fa'

import styles from './ScrollButton.module.scss'

const handleClick = () => {
  let coefficient = 1
  const onClickHandler = setInterval(() => {
    const pos = window.pageYOffset
    if (pos > 0) {
      window.scrollTo(0, pos - 75 * coefficient)
      coefficient += 0.1
    } else {
      window.clearInterval(onClickHandler)
    }
  }, 0.1)
}

const ScrollButton = () => {
  return (
    <button className={styles.button} onClick={handleClick}>
      <FaCaretUp size='1.2rem' />
    </button>
  )
}

export default ScrollButton
