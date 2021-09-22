import { allowedURLParams } from '../filterOptions/filterOptions'
import { SearchResultQueryVariables } from '../generated/index'

//filter out query variables which are not one of filter options and stringify all the values
export const formatQueryVar = (queryVar: SearchResultQueryVariables) =>
  Object.fromEntries(
    Object.entries(queryVar)
      .filter(([k]) => allowedURLParams.includes(k))
      .map(([k, val]) => [k, String(val)])
  )
