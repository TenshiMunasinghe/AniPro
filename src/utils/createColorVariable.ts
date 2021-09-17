import { CSSProperties } from 'react'
import { adjustColor } from './adjustColor'

export const createColorVariable = (color?: string | null) =>
  ({
    '--color-original': color || 'var(--color-foreground-200)',
    '--color-adjusted': adjustColor(
      color || 'var(--color-foreground-200)',
      'var(--lightness)'
    ),
  } as CSSProperties)
