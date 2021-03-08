import create from 'zustand';
import { combine } from 'zustand/middleware';

export const useWindowSizeStore = create(
  combine({ width: window.innerWidth, height: window.innerHeight }, set => ({
    set,
  }))
)

export type WindowSizeStore = ReturnType<typeof useWindowSizeStore.getState>

const initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? ('dark' as const)
  : ('light' as const)

export type Theme = typeof initialTheme

export const useThemeStore = create(
  combine({ theme: initialTheme }, set => ({ set }))
)

export type ThemeStore = ReturnType<typeof useThemeStore.getState>
