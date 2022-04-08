import { useCallback, useState } from 'react'
import { FaSort } from 'react-icons/fa'
import gqlRequestClient from '../../api/graphqlClient'
import {
  MediaSort,
  MediaType,
  useMediaSearchQuery,
} from '../../generated/index'
import { useUpdateUrlParam } from '../../hooks/useUpdateUrlParam'
import { addKey } from '../../utils/addKey'
import { formatLabel } from '../../utils/formatLabel'
import CardGrid from '../common/CardGrid'
import CardTypeButton from '../common/CardTypeButton'
import Dropdown from '../common/Dropdown/Dropdown'
import LinearLoading from '../common/LinearLoading/LinearLoading'
import ActiveFilters from './ActiveFilters'
import FilterOptions from './FilterOptions/FilterOptions'
import PageNavigation from './PageNavigation'

interface Props {
  type: MediaType
}

const PAGES = [-2, -1, 0, 1, 2]

const perPage = 20

export type CardType = 'chart' | 'cover' | 'table'

const CARD_TYPES: CardType[] = ['chart', 'cover', 'table']

const cardTypes = addKey(CARD_TYPES)

export const sortByOptions = [
  MediaSort.TrendingDesc,
  MediaSort.PopularityDesc,
  MediaSort.ScoreDesc,
  MediaSort.FavouritesDesc,
  MediaSort.StartDateDesc,
].map(option => ({ label: formatLabel(option), value: option }))

const MediaSearchResult = ({ type }: Props) => {
  const [cardType, setCardType] = useState<CardType>('chart')

  const { updateUrl, queryVars } = useUpdateUrlParam()

  const { data, isLoading, isError, isFetching } = useMediaSearchQuery(
    gqlRequestClient,
    {
      ...queryVars.initial,
      perPage,
      type,
    }
  )
  const sortByOnChange = useCallback(
    (value: string | string[]) => {
      updateUrl({ sortBy: value as MediaSort | MediaSort[] })
    },
    [updateUrl]
  )

  const medias = data?.Page?.media
  const pageInfo = data?.Page?.pageInfo

  return (
    <section>
      <div className='w-full space-y-7 pb-5'>
        <ActiveFilters />
        <section className='flex items-center justify-end'>
          <section className='mr-3 flex items-center space-x-2 border-r-2 border-zinc-400 py-1 pr-3'>
            {cardTypes.map(c => (
              <CardTypeButton
                key={c.key}
                cardType={c.value}
                setCardType={setCardType}
                isActive={c.value === cardType}
              />
            ))}
          </section>
          <Dropdown
            onChange={sortByOnChange}
            isMulti={false}
            options={sortByOptions}
            selected={queryVars.initial.sortBy || MediaSort.TrendingDesc}
            icon={{ type: FaSort, isLeft: false }}
          />
        </section>
      </div>
      <main className='grid-cols-[auto_1fr] gap-x-16 lg:grid'>
        <FilterOptions />
        <div className='grid h-fit justify-items-center space-y-7'>
          <CardGrid
            medias={medias}
            isLoading={isLoading}
            isError={isError}
            cardType={cardType}
            loadingCount={perPage}
            imageSize='large'
          />
          {!isError && !isLoading && (
            <section className='flex space-x-4'>
              {pageInfo?.currentPage !== 1 && (
                <PageNavigation page={1} text='<<' />
              )}

              {PAGES.map(p => {
                const page = (pageInfo?.currentPage || 0) + p

                if (
                  !pageInfo?.lastPage ||
                  page <= 0 ||
                  page > pageInfo.lastPage
                )
                  return null

                return (
                  <PageNavigation
                    key={page + 'page-navigation'}
                    page={page}
                    text={page.toString()}
                    isCurrent={pageInfo?.currentPage === page}
                  />
                )
              })}

              {pageInfo?.lastPage &&
                pageInfo?.currentPage !== pageInfo.lastPage && (
                  <PageNavigation page={pageInfo?.lastPage} text='>>' />
                )}
            </section>
          )}
          {!isLoading && isFetching && <LinearLoading />}
        </div>
      </main>
    </section>
  )
}

export default MediaSearchResult
