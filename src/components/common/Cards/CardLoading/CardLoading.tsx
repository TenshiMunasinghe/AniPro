import range from 'lodash/range'
import { memo } from 'react'
import { CardType } from '../../../search/MediaSearchResult'
import CardChartContainer from '../CardChart/Container'
import CardChartContent from '../CardChart/Content'
import CardCoverContainer from '../CardCover/Container'
import CardTableContainer from '../CardTable/Container'
import CardTableContent from '../CardTable/Content'
import CardTableGrid from '../CardTable/Grid'
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
        <CardCoverContainer>
          <Image />
          <Skeleton className='h-4 w-full' />
        </CardCoverContainer>
      )
    case 'chart':
      return (
        <CardChartContainer>
          <Image />
          <CardChartContent>
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
            <div className='flex space-x-3 bg-zinc-200 p-2'>
              {range(0, 2).map((_, i) => (
                <Genre className='w-2/5' key={i + 'chart-genre'} />
              ))}
            </div>
          </CardChartContent>
        </CardChartContainer>
      )
    case 'table':
      return (
        <CardTableContainer>
          <CardTableContent>
            <Image />
            <CardTableGrid>
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
            </CardTableGrid>
          </CardTableContent>
        </CardTableContainer>
      )
    default:
      return null
  }
}

export default memo(CardLoading)
