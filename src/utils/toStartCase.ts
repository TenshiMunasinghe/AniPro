import lowerCase from 'lodash/lowerCase'
import startCase from 'lodash/startCase'

export const toStartCase = (str: string) => startCase(lowerCase(str))
