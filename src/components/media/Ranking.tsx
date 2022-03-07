import { DeepPartial } from 'react-hook-form'
import { FaHeart, FaStar } from 'react-icons/fa'
import { MediaRank } from '../../generated/index'

interface Props {
  ranking: DeepPartial<MediaRank> | null
}

const Ranking = ({ ranking }: Props) => {
  if (!ranking) return null

  return (
    <div className='flex items-center rounded bg-zinc-100 px-4 py-2 text-sm capitalize dark:bg-zinc-700'>
      {ranking.type === 'POPULAR' ? (
        <FaHeart className='fill-amber-300 ' />
      ) : (
        <FaStar className='fill-red-300 ' />
      )}
      <span className='ml-auto grow text-center'>
        {`#${ranking.rank} ${ranking.context}`}
        {!ranking.allTime &&
          `${ranking.season ? ' ' + ranking.season.toLowerCase() : ''}${
            ranking.year ? ' ' + ranking.year : ''
          }`}
      </span>
    </div>
  )
}

export default Ranking
