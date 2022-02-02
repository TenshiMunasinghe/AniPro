import { forwardRef, memo, useCallback } from 'react'
import { DeepPartial } from 'react-hook-form'
import { NO_IMAGE_URL } from '../../api/queries'
import { linkToMediaPage } from '../../App'
import { Media, MediaType } from '../../generated'
import { useColorVariable } from '../../hooks/useColorVariable'
import BackgroundImage from '../common/BackgroundImage'
import CoverImage from '../common/CoverImage/CoverImage'
import Description from '../common/Description/Description'
import Genres from '../common/Genres/Genres'
import Title from '../common/Title'

interface Props {
  media?: DeepPartial<Media> | null
  index: number
  setSlide: (slide: number) => void
}

const Slide = forwardRef<HTMLDivElement[], Props>(
  ({ media, setSlide, index }, ref) => {
    const colors = useColorVariable(media?.coverImage?.color)

    const onFocus = useCallback(
      e => {
        if (!e.currentTarget.contains(e.relatedTarget?.parentNode))
          setSlide(index)
      },
      [setSlide, index]
    )

    if (!media?.id || !ref) return null

    return (
      <div
        className={
          'relative shrink-0 w-full h-screen flex flex-col justify-center p-4 sm:p-6 lg:px-20'
        }
        style={colors}
        ref={el =>
          typeof ref !== 'function' && el && ref.current
            ? (ref.current[index] = el)
            : null
        }
        tabIndex={0}
        onFocus={onFocus}>
        <BackgroundImage src={media?.coverImage?.extraLarge} blur='blur-md' />
        <div className='z-10'>
          <div className='grid mb-6 overflow-y-hidden md:grid-cols-[1fr_20rem] justify-between gap-x-10'>
            <div className='space-y-6'>
              <Title
                link={linkToMediaPage(media.id, media.type || MediaType.Anime)}
                text={media?.title?.romaji || 'no title'}
                className='text-2xl lg:text-6xl lg:leading-tight text-zinc-900 dark:text-zinc-50 font-bold'
              />
              <div className='line-clamp-8 lg:line-clamp-10 md:text-lg'>
                <Description description={media.description} />
              </div>
            </div>
            <div className='hidden lg:grid overflow-hidden rounded shadow shadow-zinc-300 dark:shadow-zinc-900'>
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
  }
)

export default memo(Slide)
