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
import { ImageSize } from '../../CardGrid'
import CoverImage from '../../CoverImage'
import Genres from '../../Genres'
import Score from '../../Score'
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
    <article className='group card-table--container relative' style={colors}>
      {rank && (
        <div className='absolute right-2 top-2 z-10 w-12 md:right-4 md:top-4'>
          <Rank rank={rank} />
        </div>
      )}
      <BackgroundImage src={bannerImage} blur='blur-none' onlyOnHover />
      <section className='card-table--content relative'>
        <CoverImage
          link={linkToMediaPage(id, type || MediaType.Anime)}
          title={title?.romaji || 'no title'}
          src={coverImage?.[imageSize] || NO_IMAGE_URL}
        />
        <div className='card-table--grid relative text-zinc-700 dark:text-zinc-300'>
          <div className='flex h-full flex-col justify-around'>
            <Title
              link={linkToMediaPage(id, type || MediaType.Anime)}
              text={title?.romaji || 'no title'}
              className='xl:text-lg msm:line-clamp-1'
            />
            <Genres
              className='hidden text-sm md:flex'
              as='section'
              genres={genres}
              canInteract={false}
              count={{ default: 1, md: 2, lg: 0, xl: 3, '2xl': 3 }}
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
      </section>
    </article>
  )
}

export default memo(CardTable)
