import { memo } from 'react'
import { DeepPartial } from 'react-hook-form'
import { NO_IMAGE_URL } from '../../../api/queries'
import { linkToMediaPage } from '../../../App'
import { Media, MediaType } from '../../../generated'
import { useColorVariable } from '../../../hooks/useColorVariable'
import Description from '../../Description'
import { ImageSize } from '../CardGrid'
import CoverImage from '../CoverImage'
import Genres from '../Genres'
import Score from '../Score'
import Title from '../Title'

interface Props {
  media: DeepPartial<Media>
  imageSize: ImageSize
}

const CardChart = ({
  media: { id, title, coverImage, genres, meanScore, description, type },
  imageSize,
}: Props) => {
  const colors = useColorVariable(coverImage?.color)

  return (
    <article className='card-chart--container' style={colors}>
      <CoverImage
        link={linkToMediaPage(id, type || MediaType.Anime)}
        src={coverImage?.[imageSize] || NO_IMAGE_URL}
        title={title?.romaji || 'no image'}
      />
      <section className='card-chart--content'>
        <section className='relative flex flex-col overflow-y-auto'>
          <div className='absolute inset-x-0 space-y-5 p-5'>
            <header>
              <div className='grid w-full grid-cols-[1fr_auto] items-start gap-x-3 gap-y-1 overflow-hidden'>
                <Title
                  link={linkToMediaPage(id, type || MediaType.Anime)}
                  text={title?.romaji || 'no title'}
                  className='sm:text-lg'
                />
                {meanScore && <Score score={meanScore} />}
                <h4 className='col-span-2 hidden text-xs text-zinc-400 md:line-clamp-1'>
                  {title?.english || title?.romaji || 'no title'}
                </h4>
              </div>
            </header>

            <p
              className='text-sm line-clamp-3 hocus:line-clamp-none sm:line-clamp-5 lg:line-clamp-4'
              tabIndex={0}>
              <Description description={description} />
            </p>
          </div>
        </section>
        <Genres
          as='footer'
          genres={genres}
          className='bg-zinc-200 py-1 px-3 text-xs dark:bg-zinc-600 md:py-2 md:text-sm'
          canInteract
        />
      </section>
    </article>
  )
}

export default memo(CardChart)
