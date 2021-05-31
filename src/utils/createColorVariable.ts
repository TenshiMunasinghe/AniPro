import { CSSProperties } from 'react'

import { adjustColor } from './adjustColor'

export const createColorVariable = (color: string) =>
  ({
    '--color-original': color,
    '--color-adjusted': adjustColor(color, 'var(--lightness)'),
  } as CSSProperties)
