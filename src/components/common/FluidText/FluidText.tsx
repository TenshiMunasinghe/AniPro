import React, { CSSProperties, FC, memo } from 'react'
import styles from './FluidText.module.scss'

import { useFitText } from '../../../hooks/useFitText'

interface Props {
  as: keyof JSX.IntrinsicElements
  max: number
  min: number
  resolution: number
  className?: string
}

export const FluidText: FC<Props> = memo(
  ({ as, max, min, resolution, className, children }) => {
    const Tag = as
    const { fontSize, ref } = useFitText({ max, min, resolution })
    const style = { '--font-size': fontSize } as CSSProperties

    return React.createElement(Tag, {
      children,
      className: styles.fluidText + (className ? ` ${className}` : ''),
      style,
      ref,
    })
  }
)
