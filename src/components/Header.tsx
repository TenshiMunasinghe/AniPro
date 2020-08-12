import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import SearchBar from './SearchBar'

const Header = () => {
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
    <Wrapper isVisible={isVisible} ref={wrapperRef}>
      <Heading>Anime Project</Heading>
      <SearchBar />
    </Wrapper>
  )
}

export const HEADER_HEIGHT = 3

const Wrapper = styled.header<{ isVisible: boolean }>`
  position: fixed;
  top: ${({ isVisible }) => (isVisible ? '0' : `-${HEADER_HEIGHT}rem`)};
  width: 100vw;
  display: flex;
  padding: 0 1rem;
  align-items: center;
  border-bottom: solid 0.3px #aab5bc;
  height: ${HEADER_HEIGHT}rem;
  background: #121212;
  transition: all 0.2s ease-in-out;
  z-index: 999;
`

const Heading = styled.h1`
  margin-right: 1rem;
  font-size: 1.2rem;
`

export default Header
