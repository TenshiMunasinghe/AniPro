import { FaCaretUp } from 'react-icons/fa'

import styles from './ScrollButton.module.scss'

const handleClick = () => {
  window.scrollTo(0, 0)
}

const ScrollButton = () => {
  return (
    <button
      className={styles.button}
      onClick={handleClick}
      aria-label='scroll to the top'>
      <FaCaretUp aria-label='caret up' />
    </button>
  )
}

export default ScrollButton
