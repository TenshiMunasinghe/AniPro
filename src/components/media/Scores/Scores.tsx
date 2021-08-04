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

  return (
    <div className={styles.container}>
      <ChartistGraph data={data} type='Bar' />
    </div>
  )
}

export default Scores
