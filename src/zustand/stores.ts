import create from 'zustand'
import { combine } from 'zustand/middleware'

const initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? ('dark' as const)
  : ('light' as const)

export type Theme = typeof initialTheme

export const useThemeStore = create(
  combine({ theme: initialTheme }, set => ({ set }))
)

export type ThemeStore = ReturnType<typeof useThemeStore.getState>
