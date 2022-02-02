import { memo } from 'react'
import { DeepPartial } from 'react-hook-form'
import { currentYear, NO_IMAGE_URL } from '../../../../api/queries'
import { linkToMediaPage } from '../../../../App'
import { Media, MediaType } from '../../../../generated'
import { useColorVariable } from '../../../../hooks/useColorVariable'
import { airingInfo } from '../../../../utils/airingInfo'
import { formatLabel } from '../../../../utils/formatLabel'
import { pluralize } from '../../../../utils/pluralize'
import { toStartCase } from '../../../../utils/toStartCase'
import BackgroundImage from '../../BackgroundImage'
import { ImageSize } from '../../CardGrid/CardGrid'
import CoverImage from '../../CoverImage/CoverImage'
import Genres from '../../Genres/Genres'
import Score from '../../Score/Score'
import Title from '../../Title'
import Rank from '../components/Rank'
import Info from './Info'

interface Props {
  media: DeepPartial<Media>
  imageSize: ImageSize
  rank?: number | null
}

const CardTable = ({
  media: {
    title,
    id,
    coverImage,
    bannerImage,
    genres,
    meanScore,
    popularity,
    status,
    season,
    seasonYear,
    nextAiringEpisode,
    format,
    episodes,
    type,
    chapters,
    startDate,
    endDate,
  },
  rank,
  imageSize,
}: Props) => {
  const colors = useColorVariable(coverImage?.color)

  return (
    <article
      className='group relative flex overflow-hidden bg-zinc-100 dark:bg-zinc-700'
      style={colors}>
      {rank && (
        <div className='absolute right-2 top-2 md:right-4 md:top-4 w-12'>
          <Rank rank={rank} />
        </div>
      )}
      <BackgroundImage src={bannerImage} blur='blur-none' onlyOnHover />
      <div className='flex-1 relative grid grid-cols-[4rem_1fr] items-center p-2 md:p-4 text-lg rounded'>
        <CoverImage
          link={linkToMediaPage(id, type || MediaType.Anime)}
          title={title?.romaji || 'no title'}
          src={coverImage?.[imageSize] || NO_IMAGE_URL}
        />
        <div className='relative grid gap-y-1 md:gap-y-0 md:grid-cols-[minmax(0,1fr)_6rem_6rem_12rem] gap-x-5 text-zinc-700 dark:text-zinc-300 pl-5 h-full'>
          <div className='flex flex-col justify-around h-full'>
            <Title
              link={linkToMediaPage(id, type || MediaType.Anime)}
              text={title?.romaji || 'no title'}
            />
            <Genres
              className='hidden md:flex text-sm'
              as='section'
              genres={genres}
              canInteract={false}
            />
          </div>

          <Info
            main={() => (meanScore ? <Score score={meanScore} /> : null)}
            sub={() =>
              meanScore && popularity !== 0 ? `${popularity} users` : null
            }
          />

          {type === MediaType.Anime && (
            <>
              <Info
                main={() => formatLabel(format || '')}
                sub={() => (episodes ? pluralize(episodes, 'episode') : null)}
              />

              <Info
                main={() =>
                  status === 'RELEASING' && seasonYear !== currentYear
                    ? `Airing Since ${seasonYear}`
                    : status === 'RELEASING'
                    ? 'Airing'
                    : toStartCase(status || '')
                }
                sub={() =>
                  airingInfo({ nextAiringEpisode, season, seasonYear })
                }
              />
            </>
          )}

          {type === MediaType.Manga && (
            <>
              <Info
                main={() => formatLabel(format || '')}
                sub={() => (chapters ? pluralize(chapters, 'chapter') : null)}
              />

              <Info
                main={() =>
                  status === 'RELEASING'
                    ? `Publishing`
                    : toStartCase(status || '')
                }
                sub={() =>
                  status === 'RELEASING'
                    ? `Since ${startDate?.year}`
                    : `From ${startDate?.year} to ${endDate?.year}`
                }
              />
            </>
          )}
        </div>
      </div>
    </article>
  )
}

export default memo(CardTable)
