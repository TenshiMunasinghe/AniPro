import { CSSProperties, useCallback } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { ThemeStore, useThemeStore } from '../../../zustand/stores'
import SearchBarInput from '../SearchBarInput/SearchBarInput'
import styles from './NavBar.module.scss'
import Switch from './Switch/Switch'

const themeSelector = ({ theme, set }: ThemeStore) => ({ theme, setTheme: set })

interface Props {
  position?: 'static' | 'sticky' | 'fixed'
}

const NavBar = ({ position = 'static' }: Props) => {
  const { theme, setTheme } = useThemeStore(themeSelector)
  const onChange = useCallback(
    () =>
      setTheme(({ theme }) =>
        theme === 'dark' ? { theme: 'light' } : { theme: 'dark' }
      ),
    [setTheme]
  )

  const style = { '--position': position } as CSSProperties

  return (
    <nav className={styles.container} style={style}>
      <h1 className={styles.heading}>
        <Link to='/'>AniPro</Link>
      </h1>
      <Switch
        onChange={onChange}
        On={FaSun}
        Off={FaMoon}
        isOn={theme === 'dark'}
        label='switch theme'
      />
      <div className={styles.searchBar}>
        <SearchBarInput />
      </div>
    </nav>
  )
}

export default NavBar
