import React from 'react'

import styles from './Footer.module.scss'

export const Footer = () => {
  const setBodyClassName = (className: 'dark' | 'light') =>
    (document.body.className = className)

  return (
    <footer className={styles.footer}>
      <div className={styles.upperSection}>
        <section className={styles.theme}>
          <button
            className={styles.light}
            aria-label='light theme'
            title='light'
            onClick={() => setBodyClassName('light')}>
            A
          </button>
          <button
            className={styles.dark}
            aria-label='dark theme'
            title='dark'
            onClick={() => setBodyClassName('dark')}>
            A
          </button>
        </section>

        <section className={styles.info}>
          <a href='https://.github.com'>GitHub</a>
        </section>
      </div>

      <section className={styles.disclaimer}>
        This site is a clone of <a href='https://anilist.co/'>AniList.co</a>
      </section>
    </footer>
  )
}
