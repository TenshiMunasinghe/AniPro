import ChartistGraph from 'react-chartist'
import { DeepPartial } from 'react-hook-form'
import { ScoreDistribution } from '../../generated'
import { Maybe } from '../../generated/index'

interface Props {
  scores?: Maybe<DeepPartial<ScoreDistribution>>[] | null
}

// const CLASS_NAME = {
//   barColors: [
//     'bg-red-400',
//     'bg-amber-400',
//     'bg-lime-400',
//     'bg-emerald-400',
//     'bg-cyan-400',
//     'bg-gray-400',
//     'bg-blue-400',
//     'bg-violet-400',
//     'bg-fuchsia-400',
//     'bg-rose-400',
//   ],
// }

const Scores = ({ scores }: Props) => {
  if (!scores) return null

  const data = {
    labels: scores.map(obj => obj?.score),
    series: [
      {
        data: scores.map(obj => obj?.amount),
        className: 'stroke-teal-400',
      },
    ],
  }

  return (
    <ChartistGraph
      data={data}
      type='Bar'
      className='w-full bg-zinc-100 p-5 pb-0 pr-0 text-xs font-medium dark:bg-zinc-700 lg:text-sm'
    />
  )
}

export default Scores
