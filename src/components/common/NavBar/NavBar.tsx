import { useCallback } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { ThemeStore, useThemeStore } from '../../../zustand/stores'
import SearchBar from '../SearchBar/SearchBar'
import Switch from './Switch/Switch'
import styles from './NavBar.module.scss'

const themeSelector = ({ theme, set }: ThemeStore) => ({ theme, setTheme: set })

const NavBar = () => {
  const { theme, setTheme } = useThemeStore(themeSelector)
  const onChange = useCallback(
    () =>
      setTheme(({ theme }) =>
        theme === 'dark' ? { theme: 'light' } : { theme: 'dark' }
      ),
    [setTheme]
  )

  return (
    <nav className={styles.container}>
      <h1 className={styles.heading}>
        <Link to='/'>AniPro</Link>
      </h1>
      <SearchBar />
      <Switch
        onChange={onChange}
        On={FaSun}
        Off={FaMoon}
        isOn={theme === 'dark'}
        label='switch theme'
      />
    </nav>
  )
}

export default NavBar
