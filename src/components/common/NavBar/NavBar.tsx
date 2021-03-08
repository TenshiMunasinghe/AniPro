import classnames from 'classnames'
import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import { ThemeStore, useThemeStore } from '../../../zustand/stores'
import Switch from '../Switch/Switch'
import styles from './NavBar.module.scss'

const themeSelector = ({ theme, set }: ThemeStore) => ({ theme, setTheme: set })

const NavBar = () => {
  const [isVisible, setIsVisible] = useState(true)
  const { theme, setTheme } = useThemeStore(themeSelector)
  const lastScroll = useRef(0)
  const wrapperRef = useRef<HTMLElement>(null)

  const onChange = useCallback(
    () =>
      setTheme(({ theme }) =>
        theme === 'dark' ? { theme: 'light' } : { theme: 'dark' }
      ),
    [setTheme]
  )

  useEffect(() => {
    const onScroll = () => {
      const currentScroll = window.pageYOffset

      if (!wrapperRef.current) {
        return
      }

      if (currentScroll < wrapperRef.current.offsetHeight) {
        setIsVisible(true)
      } else if (currentScroll > lastScroll.current) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      lastScroll.current = currentScroll
    }
    document.addEventListener('scroll', onScroll)

    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={classnames(styles.wrapper, { [styles.visible]: isVisible })}
      ref={wrapperRef as RefObject<HTMLElement>}>
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
    </nav>
  )
}

export default NavBar
