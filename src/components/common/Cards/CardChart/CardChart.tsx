import { memo } from 'react'
import { DeepPartial } from 'react-hook-form'
import { NO_IMAGE_URL } from '../../../../api/queries'
import { linkToMediaPage } from '../../../../App'
import { Media, MediaType } from '../../../../generated'
import { useColorVariable } from '../../../../hooks/useColorVariable'
import Description from '../../../Description'
import { ImageSize } from '../../CardGrid'
import CoverImage from '../../CoverImage'
import Genres from '../../Genres'
import Score from '../../Score'
import Title from '../../Title'
import Container from './Container'

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
    <Container colors={colors}>
      <CoverImage
        link={linkToMediaPage(id, type || MediaType.Anime)}
        src={coverImage?.[imageSize] || NO_IMAGE_URL}
        title={title?.romaji || 'no image'}
      />
      <section className='grid min-h-0 grid-rows-[1fr_auto]'>
        <section className='relative flex flex-col overflow-y-auto'>
          <div className='absolute inset-x-0 p-5'>
            <header className='mb-5'>
              <div className='grid w-full grid-cols-[1fr_auto] items-start gap-x-3 gap-y-1 overflow-hidden'>
                <Title
                  link={linkToMediaPage(id, type || MediaType.Anime)}
                  text={title?.romaji || 'no title'}
                />
                {meanScore && <Score score={meanScore} />}
                <h4 className='hidden text-xs text-zinc-400 md:line-clamp-1'>
                  {title?.english || title?.romaji || 'no title'}
                </h4>
              </div>
            </header>

            <p
              className='text-sm line-clamp-4 hocus:line-clamp-none'
              tabIndex={0}>
              <Description description={description} />
            </p>
          </div>
        </section>
        <Genres
          as='footer'
          genres={genres}
          className='bg-zinc-200 py-2 px-3 text-sm dark:bg-zinc-600'
          canInteract
        />
      </section>
    </Container>
  )
}

export default memo(CardChart)
