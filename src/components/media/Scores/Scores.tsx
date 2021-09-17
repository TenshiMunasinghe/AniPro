import ChartistGraph from 'react-chartist'
import { DeepPartial } from 'react-hook-form'
import { ScoreDistribution } from '../../../generated'
import { Maybe } from '../../../generated/index'
import styles from './Scores.module.scss'

interface Props {
  scores?: Maybe<DeepPartial<ScoreDistribution>>[] | null
}

const Scores = ({ scores }: Props) => {
  if (!scores) return null

  const data = {
    labels: scores.map(obj => obj?.score),
    series: [
      {
        data: scores.map(obj => obj?.amount),
        className: styles.series,
      },
    ],
  }

  return <ChartistGraph data={data} type='Bar' className={styles.container} />
}

export default Scores
