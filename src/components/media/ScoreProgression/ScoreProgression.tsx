import ChartistGraph from 'react-chartist'
import { DeepPartial } from 'react-hook-form'
import { MediaTrend } from '../../../generated/index'
import styles from '../GraphStyles.module.scss'
const ctPointLabels = require('chartist-plugin-pointlabels')

interface Props {
  trends?: (DeepPartial<MediaTrend> | null)[] | null
}

const ScoreProgression = ({ trends }: Props) => {
  const sortedTrends = trends
    ?.filter(trend => trend?.episode)
    .sort((a, b) => (a?.episode && b?.episode ? a.episode - b.episode : 0))

  if (!sortedTrends?.length) return null

  const activityData = {
    labels: sortedTrends.map(trend => trend?.episode),
    series: [
      {
        data: sortedTrends.map(trend => trend?.averageScore),
        className: styles.series,
      },
    ],
  }

  const leastValue = Math.min(
    ...sortedTrends.map(trend => trend?.averageScore || Infinity)
  )

  const greatestValue = Math.max(
    ...sortedTrends.map(trend => trend?.averageScore || 0)
  )

  return (
    <ChartistGraph
      type='Line'
      data={activityData}
      options={
        {
          plugins: [ctPointLabels({ textAnchor: 'start' })],
          axisY: {
            low: Math.floor(leastValue / 5) * 5,
            high: Math.ceil(greatestValue / 10) * 10,
            onlyInteger: true,
          },
        } as any
      }
      className={styles.container}
    />
  )
}

export default ScoreProgression
