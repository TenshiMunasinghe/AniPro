import { useCallback } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { ThemeStore, useThemeStore } from '../../zustand/stores'
import BrowseOptions from './BrowseOptions/BrowseOptions'
import Switch from './NavBar/Switch/Switch'

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

  return (
    <nav
      className={`${position} top-0 w-full flex items-center bg-zinc-700 py-2 px-4 sm:px-6 space-x-4 sm:space-x-6 z-50`}>
      <h1 className='mr-auto sm:text-lg hover:text-teal-400 focus:text-teal-400'>
        <Link to='/'>AniPro</Link>
      </h1>
      <BrowseOptions />
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