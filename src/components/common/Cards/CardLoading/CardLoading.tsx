import range from 'lodash/range'
import { memo } from 'react'
import { CardType } from '../../../search/MediaSearchResult'
import Info from '../CardTable/Info'
import Skeleton from '../Skeleton'
import Genre from './Genre'
import Image from './Image'

interface Props {
  type: CardType
}

const CardLoading = ({ type }: Props) => {
  switch (type) {
    case 'cover':
      return (
        <div className='card-cover--container'>
          <Image />
          <Skeleton className='h-4 w-full' />
        </div>
      )
    case 'chart':
      return (
        <div className='card-chart--container'>
          <Image />
          <div className='card-chart--content'>
            <div className='space-y-5 p-5'>
              <div className='space-y-2'>
                <Skeleton className='h-5 w-4/5' />
                <Skeleton className='h-3 w-3/5' />
              </div>
              <div className='space-y-2'>
                {range(0, 3).map((_, i) => (
                  <Skeleton
                    className='h-3 w-11/12'
                    key={i + 'chart-description'}
                  />
                ))}
              </div>
            </div>
            <div className='flex space-x-3 bg-zinc-200 p-2 dark:bg-zinc-600'>
              {range(0, 2).map((_, i) => (
                <Genre className='w-2/5' key={i + 'chart-genre'} />
              ))}
            </div>
          </div>
        </div>
      )
    case 'table':
      return (
        <div className='card-table--container'>
          <div className='card-table--content'>
            <Image />
            <div className='card-table--grid'>
              <div className='flex h-full flex-col justify-around'>
                <Skeleton className='h-4 w-3/5' />
                <div className='hidden space-x-3 text-sm md:flex'>
                  {range(0, 3).map((_, i) => (
                    <Genre className='w-20' key={i + 'table-genre'} />
                  ))}
                </div>
              </div>
              {range(0, 3).map((_, i) => (
                <Info
                  key={i + 'table-info'}
                  main={() => <Skeleton className='h-4 w-16' />}
                  sub={() => <Skeleton className='h-2 w-20' />}
                />
              ))}
            </div>
          </div>
        </div>
      )
    default:
      return null
  }
}

export default memo(CardLoading)
