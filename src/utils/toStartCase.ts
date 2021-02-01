import startCase from 'lodash/startCase'
import lowerCase from 'lodash/lowerCase'

export const toStartCase = (str: string) => startCase(lowerCase(str))
