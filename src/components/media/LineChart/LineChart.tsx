import ChartistGraph from 'react-chartist'
import styles from './LineChart.module.scss'
const ctPointLabels = require('chartist-plugin-pointlabels')

interface Props {
  labels: (string | number | null | undefined)[]
  data: (number | null | undefined)[]
  hasPointLabel?: boolean
}

const LineChart = ({
  labels: _labels,
  data: _data,
  hasPointLabel = false,
}: Props) => {
  const labels = _labels.flatMap(data =>
    typeof data === 'number' || typeof data === 'string' ? [data] : []
  )
  const data = _data.flatMap(data => (typeof data === 'number' ? [data] : []))

  if (!labels.length || !data.length) return null

  const activityData = {
    labels,
    series: [
      {
        data,
        className: styles.series,
      },
    ],
  }

  return (
    <ChartistGraph
      type='Line'
      data={activityData}
      options={
        hasPointLabel &&
        ({
          plugins: [ctPointLabels({ textAnchor: 'start' })],
          axisY: {
            low: Math.floor(Math.min(...data) / 5) * 5,
            high: Math.ceil(Math.max(...data) / 10) * 10,
            onlyInteger: true,
          },
        } as any)
      }
      className={styles.container}
    />
  )
}

export default LineChart
