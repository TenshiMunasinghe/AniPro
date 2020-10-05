import { atom } from 'recoil'
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

export const filterStateAtom = atom({
  key: 'filterState',
  default: initialFilterState,
})
