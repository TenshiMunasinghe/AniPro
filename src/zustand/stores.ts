import create from 'zustand'
import { combine } from 'zustand/middleware'

export const useWindowSizeStore = create(
  combine({ width: 0, height: 0 }, set => ({ set }))
)

export type WindowSizeStore = ReturnType<typeof useWindowSizeStore.getState>

const initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? 'dark'
  : 'light'

export const useThemeStore = create(
  combine({ theme: initialTheme }, set => ({ set }))
)

export type ThemeStore = ReturnType<typeof useThemeStore.getState>
