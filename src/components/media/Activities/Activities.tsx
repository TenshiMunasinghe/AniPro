import ChartistGraph from 'react-chartist'
import { DeepPartial } from 'react-hook-form'
import { MediaTrend } from '../../../generated/index'
import styles from './Activities.module.scss'

interface Props {
  activities?: (DeepPartial<MediaTrend> | null)[] | null
}

const Activities = ({ activities }: Props) => {
  const sortedActivities = activities?.sort((a, b) =>
    a?.date && b?.date ? a.date - b.date : 0
  )

  const activityData = {
    labels: sortedActivities?.map(
      activity => `${new Date((activity?.date || 0) * 1000).getDate()}th`
    ),
    series: [
      {
        data: activities?.map(activity => activity?.trending),
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
