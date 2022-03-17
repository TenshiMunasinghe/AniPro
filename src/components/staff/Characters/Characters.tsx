import groupBy from 'lodash/groupBy'
import { FaSort } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import {
  MediaSort,
  useStaffMediaCharacterQuery,
} from '../../../generated/index'
import { useInfiniteGraphQLQuery } from '../../../hooks/useInfiniteGraphQLQuery'
import { useSortMedia } from '../../../hooks/useSortMedia'
import LoadMore from '../../common/LoadMore/LoadMore'
import CardContainer from '../../person/CardContainer'
import Dropdowns from '../../person/Dropdowns'
import { sortByOptions } from '../../staff/Medias/Medias'
import Year from '../Year/Year'
import Cards from './Cards/Cards'

const Characters = ({
  sortBy,
  sortByOnChange,
}: ReturnType<typeof useSortMedia>) => {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteGraphQLQuery(
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
        <Year year='TBA' />
        <Cards edges={TBA} />
      </div>
    ) : null

  return (
    <>
      <Dropdowns
        dropdowns={[
          {
            selected: sortBy,
            onChange: sortByOnChange,
            options: sortByOptions,
            icon: { type: FaSort, isLeft: true },
          },
        ]}
      />
      <CardContainer isLoading={isLoading}>
        {[MediaSort.StartDate, MediaSort.StartDateDesc].includes(sortBy) ? (
          <>
            {sortBy === MediaSort.StartDateDesc && <Tba />}
            {Object.entries(edgesWithYears)
              .sort(([_a], [_b]) => {
                const [a, b] = [parseInt(_a), parseInt(_b)]
                return sortBy === MediaSort.StartDateDesc ? b - a : a - b
              })
              .map(([year, edges]) => (
                <div key={String(year) + String(id)}>
                  <Year year={year} />
                  <Cards edges={edges} />
                </div>
              ))}
            {sortBy === MediaSort.StartDate && <Tba />}
          </>
        ) : (
          <Cards edges={edges} />
        )}
      </CardContainer>
      <LoadMore
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage || false}
        onClick={() => fetchNextPage()}
      />
    </>
  )
}

export default Characters
