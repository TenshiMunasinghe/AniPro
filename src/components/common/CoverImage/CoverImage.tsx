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
      className='relative grid grid-cols-1 bg-zinc-500 bg-[color:var(--color-original)] overflow-hidden rounded aspect-[2/3] before:content-[""] before:absolute before:block before:w-full before:h-full before:bg-[color:var(--color-adjusted)] before:opacity-0 before:pointer-events-none before:z-20 before:transition-all hocus:before:opacity-10'>
      <LazyLoadImage
        src={src || NO_IMAGE_URL}
        alt={title || 'no title'}
        scrollPosition={scrollPosition}
        effect='opacity'
        className='w-full h-full object-cover'
      />
    </Link>
  )
}

export default CoverImage
