import { useParams } from 'react-router-dom'
import { useStaffQuery } from '../../../../generated'
import { useInfiniteGraphQLQuery } from '../../../../hooks/useInfiniteGraphQLQuery'
import { ParamTypes } from '../../../../pages/media/Media'
import LoadingSpinner from '../../../common/LoadingSpinner/LoadingSpinner'
import LoadMore from '../../LoadMore/LoadMore'
import Person from '../../Person/Person'
import styles from '../People.module.scss'

const Staff = () => {
  const { id } = useParams<ParamTypes>()

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteGraphQLQuery(
    useStaffQuery,
    ({ pageParam = 1 }) => ({ id: parseInt(id), page: pageParam }),
    {
      getNextPageParam: ({ Media }) => {
        if (!Media?.staff?.pageInfo?.currentPage) return

        const {
          staff: { pageInfo },
        } = Media

        return pageInfo.hasNextPage
          ? (pageInfo?.currentPage || 0) + 1
          : undefined
      },
    }
  )

  if (isLoading) return <LoadingSpinner isCenter={{ x: true, y: false }} />

  if (!data || data?.pages.length === 0) return null

  const { pages } = data

  return (
    <div className={styles.container}>
      <div className={styles.people}>
        {pages.map(page =>
          page?.Media?.staff?.edges?.map(staff => (
            <Person
              name={staff?.node?.name?.full}
              image={staff?.node?.image?.large}
              info={staff?.role}
              key={'staff' + staff?.node?.id + staff?.role}
            />
          ))
        )}
      </div>

      <LoadMore
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage || false}
        onClick={fetchNextPage}
      />
    </div>
  )
}

export default Staff
