import { forwardRef, memo, useEffect, useMemo, useRef } from 'react'
import { DeepPartial } from 'react-hook-form'
import { NO_IMAGE_URL } from '../../api/queries'
import { linkToMediaPage } from '../../App'
import { Media, MediaType } from '../../generated'
import { useColorVariable } from '../../hooks/useColorVariable'
import BackgroundImage from '../common/BackgroundImage'
import CoverImage from '../common/CoverImage'
import Genres from '../common/Genres'
import Title from '../common/Title'
import Description from '../Description'

interface Props {
  media?: DeepPartial<Media> | null
}

const Slide = forwardRef<HTMLElement, Props>(({ media }, slideRef) => {
  const colors = useColorVariable(media?.coverImage?.color)
  const ref = useRef<HTMLDivElement | null>(null)

  const observer = useMemo(() => {
    return new IntersectionObserver(
      entries => {
        if (!entries[0].isIntersecting) return
        ref.current?.focus()
      },
      {
        root: typeof slideRef !== 'function' ? slideRef?.current : null,
        threshold: 1,
      }
    )
  }, [slideRef])

  useEffect(() => {
    ref.current && observer.observe(ref.current)
  }, [observer])

  if (!media?.id) return null

  return (
    <div
      className='relative flex h-screen w-full shrink-0 snap-start flex-col justify-center p-4 sm:p-6 lg:px-20'
      style={colors}
      tabIndex={0}
      ref={ref}>
      <BackgroundImage src={media?.coverImage?.extraLarge} blur='blur-md' />
      <div className='z-10'>
        <div className='mb-6 grid justify-between gap-x-10 overflow-y-hidden md:grid-cols-[1fr_20rem]'>
          <div className='space-y-6'>
            <Title
              link={linkToMediaPage(media.id, media.type || MediaType.Anime)}
              text={media?.title?.romaji || 'no title'}
              className='text-2xl font-bold text-zinc-900 dark:text-zinc-50 lg:text-6xl lg:leading-tight'
            />
            <div className='line-clamp-8 md:text-lg lg:line-clamp-10'>
              <Description description={media.description} />
            </div>
          </div>
          <div className='hidden overflow-hidden rounded shadow shadow-zinc-300 dark:shadow-zinc-900 lg:grid'>
            <CoverImage
              link={linkToMediaPage(media.id, MediaType.Anime)}
              title={media?.title?.romaji || 'no title'}
              src={media?.coverImage?.extraLarge || NO_IMAGE_URL}
            />
          </div>
        </div>
        <Genres as='section' genres={media.genres} canInteract />
      </div>
    </div>
  )
})

export default memo(Slide)
