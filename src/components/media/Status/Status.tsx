import { CSSProperties } from 'react'
import { Stats } from '../../../api/types'
import { toStartCase } from '../../../utils/toStartCase'
import styles from './Status.module.scss'

interface Props {
  viewingStatus: Stats['stats']['statusDistribution']
  airingStatus: string
}

const COLORS = {
  COMPLETED: '#70d6ff',
  CURRENT: '#ff70a6',
  PLANNING: '#ff9770',
  PAUSED: '#ffd670',
  DROPPED: '#e9ff70',
}

type ColorKeys = keyof typeof COLORS

const generateStyle = (status: ColorKeys) =>
  ({ '--color': COLORS[status] } as CSSProperties)

const Status = ({ viewingStatus, airingStatus }: Props) => {
  const _status =
    airingStatus !== 'FINISHED'
      ? viewingStatus.filter(item => item.status !== 'COMPLETED')
      : viewingStatus

  const status = _status.sort((a, b) => b.amount - a.amount).slice(0, 4)

  const totalStatusCount = status.reduce(
    (total, { amount }) => total + amount,
    0
  )

  return (
    <div className={styles.container}>
      <div className={styles.statuses}>
        {status.map(({ status, amount }) => (
          <div
            key={status}
            className={styles.status}
            style={generateStyle(status as ColorKeys)}>
            <div className={styles.name}>{toStartCase(status)}</div>
            <div className={styles.amount}>
              <span className={styles.number}>{amount}</span>
              <span className={styles.users}>Users</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.percentage}>
        {status.map(({ status, amount }) => {
          const percentage = (amount * 100) / totalStatusCount
          return (
            <div
              key={status}
              style={{
                width: `${percentage}%`,
                backgroundColor: COLORS[status as ColorKeys],
              }}
              aria-label={`${status} ${Math.round(percentage)}%`}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Status
