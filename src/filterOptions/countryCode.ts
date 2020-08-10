export const countryCode = {
  Japan: 'JP',
  'South Korea': 'KR',
  China: 'CN',
  Taiwan: 'TW',
} as const

export type Countries = keyof typeof countryCode
