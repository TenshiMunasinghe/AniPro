import { groupBy } from 'lodash'
import { FaSort } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { MediaSort, useStaffMediaRoleQuery } from '../../../generated'
import { useInfiniteGraphQLQuery } from '../../../hooks/useInfiniteGraphQLQuery'
import { useSortMedia } from '../../../hooks/useSortMedia'
import CardContainer from '../../person/CardContainer'
import Dropdowns from '../../person/Dropdowns'
import { sortByOptions } from '../Medias'
import Year from '../Year/Year'
import Cards from './Cards/Cards'

const StaffRoles = ({
  sortBy,
  sortByOnChange,
}: ReturnType<typeof useSortMedia>) => {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteGraphQLQuery(
      useStaffMediaRoleQuery,
      ({ pageParam = 1 }) => ({
        id: parseInt(id),
        page: pageParam,
        sort: sortBy,
      }),
      {
        getNextPageParam: ({ Staff }) => {
          if (!Staff?.staffMedia?.pageInfo?.currentPage) return

          const {
            staffMedia: { pageInfo },
          } = Staff

          return pageInfo.hasNextPage
            ? (pageInfo?.currentPage || 0) + 1
            : undefined
        },
      }
    )

  const edges = data?.pages.flatMap(page => page.Staff?.staffMedia?.edges)

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
      <CardContainer
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage || false}
        onClick={() => fetchNextPage()}>
        {[MediaSort.StartDate, MediaSort.StartDateDesc].includes(sortBy) ? (
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
    </>
  )
}

export default StaffRoles
