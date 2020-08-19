import React from 'react'
import { FaCaretUp } from 'react-icons/fa'

import styles from './ScrollButton.module.scss'

const ScrollButton = () => {
  return (
    <button
      className={styles.button}
      onClick={() => {
        const onClickHandler = setInterval(() => {
          const pos = window.pageYOffset
          if (pos > 0) {
            window.scrollTo(0, pos - 75)
          } else {
            window.clearInterval(onClickHandler)
          }
        }, 1)
      }}>
      <FaCaretUp size='1.2rem' />
    </button>
  )
}

export default ScrollButton
