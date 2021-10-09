import { MediaType, SearchResultQueryVariables } from '../generated/index'
import { formatQueryVar } from './formatQueryVar'

export const linkToSearchPage = (
  queryVar: SearchResultQueryVariables | string,
  type?: MediaType
) => {
  if (typeof queryVar === 'string') {
    const mediaType = new URLSearchParams(queryVar).get('type')

    return `/search${
      mediaType ? `/${mediaType.toLowerCase()}` : ''
    }?${queryVar}`
  }
  const filterQuery = formatQueryVar(queryVar)

  const mediaType = type || queryVar.type || ''

  return `/search${
    mediaType ? `/${mediaType.toLowerCase()}` : ''
  }?${new URLSearchParams(filterQuery).toString()}`
}
