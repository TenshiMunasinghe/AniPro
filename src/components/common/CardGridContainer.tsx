import classnames from 'classnames'
import { FC } from 'react'
import { CardType } from '../search/MediaSearchResult'

interface Props {
  cardType: CardType
  sideScroll?: boolean
}

const CardGridContainer: FC<Props> = ({ cardType, sideScroll, children }) => {
  return (
    <section
      className={classnames(
        'grid w-full',
        {
          cover:
            'grid-cols-2 gap-x-3 gap-y-7 md:grid-cols-3 md:gap-x-4 lg:grid-cols-4 lg:gap-x-5 xl:grid-cols-5 xl:gap-x-7',
          chart: 'grid-cols-1 gap-5 xl:grid-cols-2',
          table: 'grid-cols-1 gap-y-5',
        }[cardType],
        {
          'auto-cols-[60%] grid-flow-col gap-y-0 gap-x-5 overflow-x-auto sm:grid-flow-row sm:overflow-hidden':
            sideScroll && cardType === 'cover',
        }
      )}>
      {children}
    </section>
  )
}

export default CardGridContainer
