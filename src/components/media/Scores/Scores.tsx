import ChartistGraph from 'react-chartist'
import { Stats } from '../../../api/types'
import styles from './Scores.module.scss'
import './graph.scss'

interface Props {
  scores: Stats['stats']['scoreDistribution']
}

const Scores = ({ scores }: Props) => {
  const data = {
    labels: scores.map(({ score }) => score),
    series: [scores.map(({ amount }) => amount)],
  }

  return (
    <div className={styles.container}>
      <ChartistGraph data={data} type='Bar' />
    </div>
  )
}

export default Scores
