import * as d3 from 'd3-color'
import { CSSProperties } from 'react'
import { ThemeStore, useThemeStore } from '../zustand/stores'

const LIGHTNESS = { light: 32, dark: 69 }

const themeStoreSelector = ({ theme }: ThemeStore) => theme

export const useColorVariable = (hex: string | null | undefined) => {
  const theme = useThemeStore(themeStoreSelector)

  const lch = d3.lch(hex || '#000')
  lch.l = LIGHTNESS[theme]
  const adjustedColor = lch.formatHex()

  return {
    '--color-original': hex,
    '--color-adjusted': adjustedColor,
  } as CSSProperties
}
