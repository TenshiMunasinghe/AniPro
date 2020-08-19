import { atom } from 'recoil'

export type FilterState = {
  genres: string[]
  tags: string[]
  year: string
  season: string
  format: string[]
  status: string
  country: string
  source: string
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
}

export const filterStateAtom = atom({
  key: 'filterState',
  default: initialFilterState,
})

export const searchTextAtom = atom({
  key: 'searchText',
  default: '',
})
