import { TimeUnits } from './type';

export const timeToArr = (time: { [key in TimeUnits]?: number }) =>
  Object.entries<number | undefined>(time)
    .filter(([_, val]) => val !== undefined && val !== 0)
    .map(([key, val]) => ({ num: val, unit: key }))
