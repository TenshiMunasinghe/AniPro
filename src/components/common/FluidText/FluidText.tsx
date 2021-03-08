import classnames from 'classnames'
import React, { CSSProperties, FC, memo } from 'react'

import { useFitText } from '../../../hooks/useFitText'
import styles from './FluidText.module.scss'

interface Props {
  as: keyof JSX.IntrinsicElements
  max: number
  min: number
  resolution: number
  className?: string
}

const FluidText: FC<Props> = memo(
  ({ as: Tag, max, min, resolution, className, children }) => {
    const { fontSize, ref } = useFitText({ max, min, resolution })
    const style = { '--font-size': fontSize } as CSSProperties

    return React.createElement(Tag, {
      children,
      className: classnames(styles.fluidText, className),
      style,
      ref,
    })
  }
)

export default FluidText
