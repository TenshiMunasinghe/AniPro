import { useContext } from 'react'
import { DeepPartial } from 'react-hook-form'
import { FaThumbsUp } from 'react-icons/fa'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { NO_IMAGE_URL } from '../../api/queries'
import { Review as ReviewType } from '../../generated/index'
import { context } from '../../pages/Media'
import Score from '../common/Score'

interface Props {
  review?: DeepPartial<ReviewType> | null
}

const Review = ({ review }: Props) => {
  const { scrollPosition } = useContext(context)

  return (
    <div className='relative flex space-x-5 text-sm'>
      <LazyLoadImage
        scrollPosition={scrollPosition}
        src={review?.user?.avatar?.medium || NO_IMAGE_URL}
        alt={'user ' + review?.user?.name || 'no name'}
        className='block aspect-square h-14 rounded-sm'
      />
      <div className='relative flex flex-1 flex-col space-y-2 rounded bg-zinc-700 py-4 px-5'>
        <Score score={review?.score || 0} />
        <q className='flex-1 text-center italic'>
          "{review?.summary || 'no review'}"
        </q>
        <div className='ml-auto flex w-fit items-center space-x-1'>
          <FaThumbsUp />
          <span>{review?.rating}</span>
        </div>
      </div>
    </div>
  )
}

export default Review
