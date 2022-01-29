import { CSSProperties, forwardRef, memo, useCallback } from 'react'
import { DeepPartial } from 'react-hook-form'
import { NO_IMAGE_URL } from '../../api/queries'
import { linkToMediaPage } from '../../App'
import { Media, MediaType } from '../../generated'
import { adjustColor } from '../../utils/adjustColor'
import { createColorVariable } from '../../utils/createColorVariable'
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
    const onFocus = useCallback(
      e => {
        if (!e.currentTarget.contains(e.relatedTarget?.parentNode))
          setSlide(index)
      },
      [setSlide, index]
    )

    if (!media?.id || !ref) return null

    const style = {
      '--cover-image': `url(${media?.coverImage?.extraLarge || NO_IMAGE_URL})`,
      ...createColorVariable(
        media?.coverImage?.color || 'var(--color-foreground-200)'
      ),
      '--color-adjusted': adjustColor(
        media?.coverImage?.color || 'var(--color-foreground-200)',
        '85%'
      ),
    } as CSSProperties

    return (
      <div
        className={
          'relative shrink-0 w-full h-screen flex flex-col justify-center p-4 sm:p-6 lg:px-20'
        }
        style={style}
        ref={el =>
          typeof ref !== 'function' && el && ref.current
            ? (ref.current[index] = el)
            : null
        }
        tabIndex={0}
        onFocus={onFocus}>
        <div
          className={`absolute inset-0 bg-zinc-700 bg-[color:var(--color-original)] bg-[image:var(--cover-image)] bg-no-repeat bg-cover bg-center -z-10 blur-md brightness-[0.35]`}
        />
        <div className='grid mb-6 overflow-y-hidden text-zinc-100 md:grid-cols-[1fr_20rem] justify-between gap-x-10'>
          <div className='space-y-6'>
            <Title
              link={linkToMediaPage(media.id, media.type || MediaType.Anime)}
              text={media?.title?.romaji || 'no title'}
              size={['text-2xl lg:text-6xl']}
              lineHeight={['lg:leading-tight']}
            />
            <div className='line-clamp-8 lg:line-clamp-10 md:text-lg'>
              <Description description={media.description} />
            </div>
          </div>
          <div className='hidden lg:grid'>
            <CoverImage
              link={linkToMediaPage(media.id, MediaType.Anime)}
              title={media?.title?.romaji || 'no title'}
              src={media?.coverImage?.extraLarge || NO_IMAGE_URL}
            />
          </div>
        </div>
        <Genres as='section' genres={media.genres} canInteract />
      </div>
    )
  }
)

export default memo(Slide)
