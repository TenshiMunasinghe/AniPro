import React from 'react'
import styled from 'styled-components'
import { AiFillCaretUp } from 'react-icons/ai'

const ScrollButton = () => {
  return (
    <Button
      onClick={() => {
        const onClickHandler = setInterval(() => {
          const pos = window.pageYOffset
          if (pos > 0) {
            window.scrollTo(0, pos - 75)
          } else {
            window.clearInterval(onClickHandler)
          }
        }, 1)
      }}>
      <AiFillCaretUp />
    </Button>
  )
}

const Button = styled.button`
  background: #222;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  border: none;
  padding: 1rem;

  &:hover {
    background: #323232;
  }
`

export default ScrollButton
