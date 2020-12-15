import create from 'zustand'
import { combine } from 'zustand/middleware'
import { SortBy } from '../filterOptions'

export type FilterState = {
  genres: string[]
  tags: string[]
  year: string
  season: string
  format: string[]
  status: string
  country: string
  source: string
  sortBy: SortBy
}

export type FilterStateKeys = keyof FilterState

export const initialFilterState: FilterState = {
  // first letter of genres must be capital
  genres: [],
  tags: [],
  year: '',
  season: '',
  format: [],
  status: '',
  country: '',
  source: '',
  sortBy: 'TRENDING_DESC',
}

type Theme = 'dark' | 'light'

export const useFilterStateStore = create(
  combine({ filterState: { ...initialFilterState } }, set => ({
    setFilterState: (obj: Partial<FilterState>) =>
      set(state => ({ filterState: { ...state.filterState, ...obj } })),
    resetFilterState: () => set({ filterState: { ...initialFilterState } }),
  }))
)

export type FilterStateStore = ReturnType<typeof useFilterStateStore.getState>

export const useWindowSizeStore = create(
  combine({ width: 0, height: 0 }, set => ({ set }))
)

export type WindowSizeStore = ReturnType<typeof useWindowSizeStore.getState>

// export type ThemeStore = {
//   theme: 'dark' | 'light'
//   lightness: number
//   setTheme: (theme: Theme) => void
// }

// export const useThemeStore = create<ThemeStore>((set, get) => ({
//   theme: 'dark',
//   lightness: get().theme === 'dark' ? 70 : 40,
//   setTheme: (theme: Theme) => set({ theme }),
// }))
