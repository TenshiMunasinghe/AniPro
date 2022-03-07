import classnames from 'classnames'
import { useContext } from 'react'
import { DeepPartial } from 'react-hook-form'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'
import { NO_IMAGE_URL } from '../../api/queries'
import { linkToMediaPage } from '../../App'
import {
  MediaFormat,
  MediaRelation,
  MediaStatus,
  MediaType,
} from '../../generated/index'
import { useOverflow } from '../../hooks/useOverflow'
import { context } from '../../pages/Media'

// const UNSUPPORTED_FORMAT: (MediaFormat | undefined | null)[] = [
//   MediaFormat.Novel,
//   MediaFormat.Manga,
//   MediaFormat.Music,
// ]

interface Props {
  id?: number
  image?: string | null
  relation?: DeepPartial<MediaRelation> | null
  title?: string | null
  format?: DeepPartial<MediaFormat> | null
  status?: DeepPartial<MediaStatus> | null
  isCollapsed?: boolean
  type: MediaType | null
}

const Relation = ({
  id,
  image,
  relation,
  title,
  format,
  status,
  isCollapsed,
  type,
}: Props) => {
  const { scrollPosition } = useContext(context)
  const { isLeft, wrapperRef } = useOverflow()

  const relationLabel = relation?.replace('_', ' ').toLowerCase()

  const linkUrl = id ? linkToMediaPage(id, type || MediaType.Anime) : '#'

  return (
    <div
      className={classnames(
        'flex w-full shrink-0 bg-zinc-100 dark:bg-zinc-700',
        {
          'group lg:relative': isCollapsed,
        }
      )}>
      <Link
        to={linkUrl}
        className='grid aspect-[var(--image-aspect-ratio)] w-[var(--image-width)] overflow-hidden'>
        <LazyLoadImage
          src={image || NO_IMAGE_URL}
          alt={title || 'no image'}
          scrollPosition={scrollPosition}
          effect='opacity'
          className='h-full'
        />
        <div
          className={classnames(
            'pointer-events-none absolute bottom-0 left-0 right-0 z-10 hidden bg-zinc-700/80 py-3 text-center text-sm capitalize',
            { 'lg:block': isCollapsed }
          )}>
          {relationLabel || 'unknown'}
        </div>
      </Link>

      <div
        className={classnames('flex flex-1 flex-col p-4 pl-6', {
          'lg:pointer-events-none lg:absolute lg:inset-y-0 lg:w-80 lg:opacity-0':
            isCollapsed,
          'lg:right-[var(--image-width)]': isLeft,
          'lg:left-[var(--image-width)]': !isLeft,
        })}
        ref={wrapperRef}>
        <div className='text-sm uppercase text-teal-600 dark:text-teal-400'>
          {relationLabel}
        </div>
        <h5 className='mt-2 line-clamp-2'>
          <Link to={linkUrl}>{title || 'no title'}</Link>
        </h5>
        <div className='mt-auto'>
          {format?.toLowerCase().replaceAll('_', ' ')}
          {' - '}
          {status?.toLowerCase().replaceAll('_', ' ')}
        </div>
      </div>
    </div>
  )
}

export default Relation
