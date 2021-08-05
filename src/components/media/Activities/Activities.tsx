import ChartistGraph from 'react-chartist'
import { Stats } from '../../../api/types'
import styles from './Activities.module.scss'

interface Props {
  activities: Stats['trends']['nodes']
}

const Activities = ({ activities }: Props) => {
  const sortedActivities = activities.sort((a, b) => a.date - b.date)

  const activityData = {
    labels: sortedActivities.map(
      ({ date }) => `${new Date(date * 1000).getDate()}th`
    ),
    series: [
      {
        data: activities.map(({ trending }) => trending),
        className: styles.series,
      },
    ],
  }

  return (
    <ChartistGraph
      data={activityData}
      type='Line'
      className={styles.container}
    />
  )
}

export default Activities
