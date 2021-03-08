import { sortByOptions } from '../filterOptions/filterOptions';
import { toStartCase } from './toStartCase';

export const formatLabel = (str: string) => {
  const _sortByOptions = Object.fromEntries(
    sortByOptions.map(({ value, label }) => [value, label])
  )

  const specialCase: { [key: string]: string } = {
    OVA: 'OVA',
    ONA: 'ONA',
    TV_SHORTS: 'TV Shorts',
    TV: 'TV Show',
    ..._sortByOptions,
  }

  return specialCase[str] ? specialCase[str] : toStartCase(str)
}
