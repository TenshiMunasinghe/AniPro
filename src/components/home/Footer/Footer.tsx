import React from 'react';

import { ThemeStore, useThemeStore } from '../../../zustand/stores';
import styles from './Footer.module.scss';

const themeSelector = ({ set }: ThemeStore) => set

const Footer = () => {
  const setTheme = useThemeStore(themeSelector)

  return (
    <footer className={styles.footer}>
      <div className={styles.upperSection}>
        <section className={styles.theme}>
          <button
            className={styles.light}
            aria-label='light theme'
            title='light'
            onClick={() => setTheme({ theme: 'light' })}>
            A
          </button>
          <button
            className={styles.dark}
            aria-label='dark theme'
            title='dark'
            onClick={() => setTheme({ theme: 'dark' })}>
            A
          </button>
        </section>

        <section className={styles.info}>
          <a href='https://github.com/TenshiMunasinghe/AniPro'>GitHub</a>
        </section>
      </div>

      <section className={styles.disclaimer}>
        This site is a clone of <a href='https://anilist.co/'>AniList.co</a>
      </section>
    </footer>
  )
}

export default Footer
