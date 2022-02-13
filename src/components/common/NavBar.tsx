import { useCallback } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { ThemeStore, useThemeStore } from '../../zustand/stores'
import BrowseOptions from './BrowseOptions/BrowseOptions'
import Switch from './Switch'

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
      className={`${position} bottom-0 z-50 flex w-full items-center space-x-4 bg-zinc-100 py-2 px-4 shadow shadow-zinc-200 dark:bg-zinc-700 dark:text-zinc-200 dark:shadow-zinc-900 sm:space-x-6 sm:px-6 lg:bottom-auto lg:top-0`}>
      <h1 className='mr-auto hocus:text-teal-700 dark:hocus:text-teal-400 sm:text-xl'>
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
