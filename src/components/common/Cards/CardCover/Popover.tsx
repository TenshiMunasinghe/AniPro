import classnames from 'classnames'
import { memo } from 'react'
import { DeepPartial } from 'react-hook-form'
import { Media } from '../../../../generated'
import { useOverflow } from '../../../../hooks/useOverflow'
import { airingInfo } from '../../../../utils/airingInfo'
import { convertTime } from '../../../../utils/convertTIme'
import { formatLabel } from '../../../../utils/formatLabel'
import { pluralize } from '../../../../utils/pluralize'
import { timeToArr } from '../../../../utils/timeToArr'
import { timeToStr } from '../../../../utils/timeToStr'
import Genres from '../../Genres/Genres'
import Score from '../../Score/Score'

interface Props {
  index: number // for repositioning when order changes
  media: DeepPartial<Media>
}

const Popover = ({ media }: Props) => {
  const { isLeft, isRight, wrapperRef } = useOverflow()

  if (!media.type) return null

  const {
    nextAiringEpisode,
    season,
    seasonYear,
    studios,
    meanScore,
    genres,
    format,
    episodes,
    duration,
    type,
    chapters,
    startDate,
    endDate,
  } = media

  const _duration = timeToArr(
    convertTime({
      num: duration || 0,
      input: 'minutes',
      output: ['hours', 'minutes'],
    })
  ).slice(0, 2)

  const isHidden = !isLeft && !isRight

  return (
    <aside
      className={classnames(
        'pointer-events-none absolute block top-0 bg-zinc-50 dark:bg-zinc-700 min-w-[23rem] max-w-[23rem] p-5 rounded shadow-md shadow-zinc-700 dark:shadow-zinc-900 z-20 transition-all scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within::scale-100 group-focus-within:opacity-100',
        isLeft ? 'left-auto right-full mr-3' : 'right-auto left-full ml-3',
        {
          '': isHidden,
        }
      )}
      ref={wrapperRef}>
      {type === 'ANIME' && (
        <>
          {(nextAiringEpisode || season || seasonYear || meanScore) && (
            <header className='grid grid-cols-[1fr_auto] items-center gap-x-4 mb-4 whitespace-nowrap'>
              <div>{airingInfo({ nextAiringEpisode, season, seasonYear })}</div>
              {meanScore && <Score score={meanScore} />}
            </header>
          )}
          <>
            {studios?.nodes?.[0]?.name && (
              <div className='text-[color:var(--color-adjusted)]'>
                {studios?.nodes?.[0]?.name}
              </div>
            )}
            <div className='mt-3'>
              {formatLabel(format || '')}
              {format === 'MOVIE' && _duration.length > 0 ? (
                <>
                  <span className='m-2'>•</span>
                  {timeToStr(_duration)}
                </>
              ) : format !== 'MOVIE' && episodes ? (
                <>
                  <span className='m-2'>•</span>
                  {pluralize(episodes, 'Episode')}
                </>
              ) : (
                ''
              )}
            </div>
          </>
        </>
      )}

      {type === 'MANGA' && (
        <div className='flex flex-col relative'>
          {meanScore && (
            <div className='absolute right-0'>
              <Score score={meanScore} />
            </div>
          )}
          {startDate?.year && (
            <div>
              {endDate?.year
                ? `${startDate.year} - ${endDate.year}`
                : `Publishing since ${startDate.year}`}
            </div>
          )}
          {chapters && <div>{pluralize(chapters, 'chapter')}</div>}
        </div>
      )}
      <Genres
        as='footer'
        genres={genres}
        canInteract={false}
        className='text-sm mt-5'
      />
    </aside>
  )
}

export default memo(Popover)
