import { v4 } from 'uuid'

export const addKey = <T>(arr: T[]) => arr.map(value => ({ key: v4(), value }))
