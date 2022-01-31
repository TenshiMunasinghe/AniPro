import { memo } from 'react'
import CoverImage from '../../../CoverImage/CoverImage'
import Title from '../../../Title'
import Rank from '../../components/Rank/Rank'
import { CardCoverContent } from '../CardCover'
import Container from '../Container'

interface Props {
  main: CardCoverContent
  sub?: CardCoverContent
  rank?: number | null
}

const Content = ({ main, sub, rank }: Props) => {
  return (
    <Container>
      {rank && (
        <div className='absolute -left-2 -top-2 w-11'>
          <Rank rank={rank} />
        </div>
      )}
      <div className='relative h-fit rounded overflow-hidden shadow shadow-zinc-700 dark:shadow-zinc-900'>
        <figure className='grid'>
          <CoverImage
            link={main.link}
            src={main.image}
            title={main.title || 'no title'}
          />
        </figure>
        {sub && sub.image !== undefined && (
          <figure className='grid absolute bottom-0 right-0 w-2/5 rounded-sm ring ring-zinc-800'>
            <CoverImage
              link={sub.link}
              src={sub.image}
              title={sub.title || 'no name'}
            />
          </figure>
        )}
      </div>
      <div>
        <Title link={main.link} text={main.title || 'no title'} />
        <Title
          link={sub?.link || main.link}
          text={sub?.title || ''}
          className='text-sm'
        />
      </div>
    </Container>
  )
}

export default memo(Content)
