import { useContext } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, useLocation } from 'react-router-dom'
import { NO_IMAGE_URL } from '../../../api/queries'
import { ScrollPositionContext } from '../../../App'

interface Props {
  link?: string
  title?: string | null
  src?: string | null
}

const CoverImage = ({ link, title, src }: Props) => {
  const scrollPosition = useContext(ScrollPositionContext)
  const { pathname, search } = useLocation()

  return (
    <Link
      to={link || pathname + search}
      aria-label={title || 'no title'}
      className='relative grid aspect-[2/3] grid-cols-1 overflow-hidden bg-zinc-500 bg-[color:var(--color-original)] before:pointer-events-none before:absolute before:z-20 before:block before:h-full before:w-full before:bg-[color:var(--color-adjusted)] before:opacity-0 before:transition-all before:content-[""] hocus:before:opacity-10'>
      <LazyLoadImage
        src={src || NO_IMAGE_URL}
        alt={title || 'no title'}
        scrollPosition={scrollPosition}
        effect='opacity'
        className='h-full w-full object-cover'
      />
    </Link>
  )
}

export default CoverImage
