import ChartistGraph from 'react-chartist'
import { Stats } from '../../../api/types'
import styles from './Scores.module.scss'

interface Props {
  scores: Stats['stats']['scoreDistribution']
}

const Scores = ({ scores }: Props) => {
  const data = {
    labels: scores.map(({ score }) => score),
    series: [
      {
        data: scores.map(({ amount }) => amount),
        className: styles.series,
      },
    ],
  }

  return <ChartistGraph data={data} type='Bar' className={styles.container} />
}

export default Scores
