import classnames from 'classnames'
import groupBy from 'lodash/groupBy'
import { FaSort } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import {
  MediaSort,
  useStaffMediaCharacterQuery,
} from '../../../../generated/index'
import { useInfiniteGraphQLQuery } from '../../../../hooks/useInfiniteGraphQLQuery'
import { useSortMedia } from '../../../../hooks/useSortMedia'
import { sortByOptions } from '../../../character/Medias/Medias'
import styles from '../../../character/Medias/Medias.module.scss'
import Dropdown from '../../../common/Dropdown/Dropdown'
import LoadingSpinner from '../../../common/LoadingSpinner/LoadingSpinner'
import LoadMore from '../../../common/LoadMore/LoadMore'
import Cards from './Cards/Cards'

const Characters = () => {
  const { id } = useParams<{ id: string }>()

  const { sortBy, sortByOnChange } = useSortMedia()

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteGraphQLQuery(
    useStaffMediaCharacterQuery,
    ({ pageParam = 1 }) => ({
      id: parseInt(id),
      page: pageParam,
      sort: sortBy,
    }),
    {
      getNextPageParam: ({ Staff }) => {
        if (!Staff?.characterMedia?.pageInfo?.currentPage) return

        const {
          characterMedia: { pageInfo },
        } = Staff

        return pageInfo.hasNextPage
          ? (pageInfo?.currentPage || 0) + 1
          : undefined
      },
    }
  )

  const edges = data?.pages.flatMap(page => page.Staff?.characterMedia?.edges)

  const groupedEdges = groupBy(
    edges,
    edge => edge?.node?.startDate?.year || 'TBA'
  )

  const { TBA, ...edgesWithYears } = groupedEdges

  const Tba = () =>
    TBA?.length ? (
      <div>
        <h6 className={styles.year}>TBA</h6>
        <Cards edges={TBA} />
      </div>
    ) : null

  return (
    <div className={styles.container}>
      <div className={styles.dropdowns}>
        <Dropdown
          selected={sortBy}
          onChange={sortByOnChange}
          options={sortByOptions}
          icon={{ type: FaSort, isLeft: true }}
        />
      </div>
      <div className={classnames(styles.cardContainer)}>
        {isLoading && <LoadingSpinner />}

        {!isLoading &&
          ([MediaSort.StartDate, MediaSort.StartDateDesc].includes(sortBy) ? (
            <>
              {sortBy === MediaSort.StartDateDesc && <Tba />}
              {Object.entries(edgesWithYears)
                .sort(([a], [b]) =>
                  sortBy === MediaSort.StartDateDesc
                    ? parseInt(b) - parseInt(a)
                    : parseInt(a) - parseInt(b)
                )
                .map(([year, edges]) => (
                  <div key={String(year) + String(id)}>
                    <h6 className={styles.year}>{year}</h6>
                    <Cards edges={edges} />
                  </div>
                ))}
              {sortBy === MediaSort.StartDate && <Tba />}
            </>
          ) : (
            <Cards edges={edges} />
          ))}
      </div>
      <LoadMore
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage || false}
        onClick={() => fetchNextPage()}
      />
    </div>
  )
}

export default Characters
