import classnames from 'classnames'
import { memo, useContext } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link as RouterLink } from 'react-router-dom'
import { NO_IMAGE_URL } from '../../api/queries'
import { linkToCharacterPage, linkToStaffPage } from '../../App'
import { StaffImage, StaffName } from '../../generated/index'
import { context } from '../../pages/Media'
import { toStartCase } from '../../utils/toStartCase'
import Link from '../common/Link/Link'

interface Props {
  id?: number | null
  image: StaffImage['large']
  name: StaffName['full']
  info: string | null | undefined
  isReversed?: boolean
  type: 'Staff' | 'Character'
}

const Person = ({ id, image, name, info, type, isReversed = false }: Props) => {
  const { scrollPosition } = useContext(context)

  if (!id) return null

  const link = type === 'Staff' ? linkToStaffPage(id) : linkToCharacterPage(id)

  return (
    <div
      className={classnames('flex bg-zinc-100 dark:bg-zinc-700', {
        'flex-row-reverse': isReversed,
      })}>
      <RouterLink to={link} className='overflow-hidden'>
        <figure className='aspect-[var(--image-aspect-ratio)] w-16 hocus:scale-105'>
          <LazyLoadImage
            scrollPosition={scrollPosition}
            src={image || NO_IMAGE_URL}
            alt={name || 'no info'}
          />
        </figure>
      </RouterLink>
      <div
        className={classnames(
          'flex flex-1 flex-col justify-center p-4 text-sm',
          { 'text-right': isReversed }
        )}>
        <Link to={link} className='flex-grow font-medium'>
          {name}
        </Link>
        {info && <div className='text-xs'>{toStartCase(info)}</div>}
      </div>
    </div>
  )
}

export default memo(Person)
