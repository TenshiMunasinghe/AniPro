import React, { useLayoutEffect, useRef, useState } from 'react'

import useWindowResize from '../../hooks/useWindowResize'

import styles from './Popover.module.scss'

interface Props {
  isVisible: boolean
}

type Position = {
  x: number
  width: number
}

const Popover = (props: Props) => {
  const [position, setPosition] = useState<Position | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const { width: windowWidth } = useWindowResize()

  useLayoutEffect(() => {
    setPosition(() => {
      if (!wrapperRef.current) {
        return null
      }
      const rect = wrapperRef.current.getBoundingClientRect()
      const x = rect.x + wrapperRef.current.offsetLeft

      return {
        x,
        width: rect.width,
      }
    })
  }, [])

  const classNameModifier =
    position === null || !props.isVisible
      ? 'hide'
      : position.x + position.width > windowWidth
      ? 'left'
      : 'right'

  // if(    position&& position.x + position.width > windowWidth
  //   ) classNameModifier = 'left'

  return (
    <div
      className={styles.wrapper + ' ' + styles[classNameModifier]}
      ref={wrapperRef}>
      popover boi
    </div>
  )
}

export default React.memo(Popover)
