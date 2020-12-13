import React, { useEffect, useState, useRef, RefObject } from 'react'
import { Link } from 'react-router-dom'

import styles from './Header.module.scss'

export const Header = () => {
  const [isVisible, setIsVisible] = useState(true)
  const lastScroll = useRef(0)
  const wrapperRef = useRef<HTMLElement>(null)

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
    <header
      className={styles.wrapper + (isVisible ? ' ' + styles.visible : '')}
      ref={wrapperRef as RefObject<HTMLElement>}>
      <h1 className={styles.heading}>
        <Link to='/'>Anime Project</Link>
      </h1>
    </header>
  )
}
