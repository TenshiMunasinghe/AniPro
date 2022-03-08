import { useParams } from 'react-router-dom'
import { CharacterEdge, useCharactersQuery } from '../../generated/index'
import { useInfiniteGraphQLQuery } from '../../hooks/useInfiniteGraphQLQuery'
import { ParamTypes } from '../../pages/Media'
import LoadingSpinner from '../common/LoadingSpinner'
import Character from './Character'
import LoadMoreGrid from './LoadMoreGrid'

const Characters = () => {
  const { id } = useParams<ParamTypes>()
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteGraphQLQuery(
      useCharactersQuery,
      ({ pageParam = 1 }) => ({ id: parseInt(id), page: pageParam }),
      {
        getNextPageParam: ({ Media }) => {
          if (!Media?.characters?.pageInfo?.currentPage) return

          const {
            characters: { pageInfo },
          } = Media

          return pageInfo.hasNextPage
            ? (pageInfo?.currentPage || 0) + 1
            : undefined
        },
      }
    )

  if (isLoading) return <LoadingSpinner isCenter={{ x: true, y: false }} />

  if (!data) return null

  return (
    <LoadMoreGrid
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage || false}
      onClick={() => fetchNextPage()}>
      {data.pages.map(characters =>
        characters.Media?.characters?.edges?.map(character => (
          <Character
            character={character as CharacterEdge}
            key={'character' + character?.node?.id}
          />
        ))
      )}
    </LoadMoreGrid>
  )
}

export default Characters
