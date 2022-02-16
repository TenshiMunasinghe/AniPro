import classnames from 'classnames'
import { createElement, memo, useMemo } from 'react'
import { Media } from '../../generated'
import { addKey } from '../../utils/addKey'
import Genre from './Genre'

interface Props {
  as: 'section' | 'footer'
  genres: Media['genres']
  canInteract: boolean
  className?: string
  count?: {
    default?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
  }
}

const numberOrInfinity = (num: number | undefined) =>
  num !== undefined ? num : Infinity

const Genres = ({ as: Tag, genres, canInteract, className, count }: Props) => {
  const _genres = useMemo(() => addKey(genres || []), [genres])

  if (!genres || genres.length === 0) return null

  return createElement(Tag, {
    children: _genres.map(({ value, key }, idx) =>
      value ? (
        <Genre
          key={key}
          genre={value}
          canInteract={canInteract}
          className={
            count
              ? classnames({
                  'msm:hidden': idx >= numberOrInfinity(count.default),
                  'btw-sm-md:hidden': idx >= numberOrInfinity(count.sm),
                  'btw-md-lg:hidden': idx >= numberOrInfinity(count.md),
                  'btw-lg-xl:hidden': idx >= numberOrInfinity(count.lg),
                  'btw-xl-2xl:hidden': idx >= numberOrInfinity(count.xl),
                  '2xl:hidden': idx >= numberOrInfinity(count['2xl']),
                })
              : ''
          }
        />
      ) : null
    ),
    className: classnames('flex overflow-x-auto space-x-3', className),
  })
}

export default memo(Genres)
