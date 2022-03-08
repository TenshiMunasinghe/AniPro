import { useParams } from 'react-router-dom'
import { Review as ReviewType } from '../../generated'
import { useReviewsQuery } from '../../generated/index'
import { useInfiniteGraphQLQuery } from '../../hooks/useInfiniteGraphQLQuery'
import { ParamTypes } from '../../pages/Media'
import LoadingSpinner from '../common/LoadingSpinner'
import LoadMoreGrid from './LoadMoreGrid'
import Review from './Review'

const Reviews = () => {
  const { id } = useParams<ParamTypes>()
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteGraphQLQuery(
      useReviewsQuery,
      ({ pageParam = 1 }) => ({ id: parseInt(id), page: pageParam }),
      {
        getNextPageParam: ({ Media }) => {
          if (!Media?.reviews?.pageInfo?.currentPage) return

          const {
            reviews: { pageInfo },
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
      {data.pages.map(({ Media }) =>
        Media?.reviews?.nodes?.map(review => (
          <Review key={'review' + review?.id} review={review as ReviewType} />
        ))
      )}
    </LoadMoreGrid>
  )
}

export default Reviews
