export const pluralize = (num: number, str: string) => {
  return num === 1 ? `${num} ${str}` : `${num} ${str}s`
}
