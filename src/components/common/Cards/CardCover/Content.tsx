import { memo } from 'react'
import CoverImage from '../../CoverImage'
import Title from '../../Title'
import Rank from '../components/Rank'
import { CardCoverContent } from './CardCover'

interface Props {
  main: CardCoverContent
  sub?: CardCoverContent
  rank?: number | null
}

const Content = ({ main, sub, rank }: Props) => {
  return (
    <article className='card-cover--container'>
      {rank && (
        <div className='absolute left-1 top-1 z-10 w-10'>
          <Rank rank={rank} />
        </div>
      )}
      <div className='relative h-fit overflow-hidden rounded-sm shadow shadow-zinc-700 dark:shadow-zinc-900'>
        <figure className='grid'>
          <CoverImage
            link={main.link}
            src={main.image}
            title={main.title || 'no title'}
          />
        </figure>
        {sub && sub.image !== undefined && (
          <figure className='absolute bottom-0 right-0 grid w-1/3 rounded-sm ring ring-zinc-800'>
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
    </article>
  )
}

export default memo(Content)
