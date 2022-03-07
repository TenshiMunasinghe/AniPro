import { useContext } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { NO_IMAGE_URL } from '../../api/queries'
import { MediaStreamingEpisode } from '../../generated'
import { context } from '../../pages/Media'

interface Props {
  episode?: MediaStreamingEpisode | null
}

const Episode = ({ episode }: Props) => {
  const { scrollPosition } = useContext(context)
  return (
    <a
      href={episode?.url || ''}
      target='_blank'
      rel='noreferrer'
      className='group relative aspect-video overflow-hidden rounded'>
      <LazyLoadImage
        src={episode?.thumbnail || NO_IMAGE_URL}
        alt={episode?.title || 'no image'}
        scrollPosition={scrollPosition}
        className='transition-all group-focus-within:scale-105 group-hover:scale-105'
      />

      <h6 className='absolute inset-x-0 bottom-0 overflow-hidden text-ellipsis whitespace-nowrap bg-zinc-300/80 py-2 px-3 text-sm font-medium hover:text-teal-400 dark:bg-zinc-600/80'>
        {episode?.title || 'no title'}
      </h6>
    </a>
  )
}

export default Episode
