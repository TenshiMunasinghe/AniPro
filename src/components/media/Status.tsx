import classnames from 'classnames'
import { Maybe, MediaStatus, StatusDistribution } from '../../generated/index'
import { toStartCase } from '../../utils/toStartCase'

interface Props {
  viewingStatus?: Maybe<StatusDistribution>[] | null
  airingStatus?: MediaStatus | null
}

const CLASS_NAME = {
  COMPLETED: 'bg-sky-300',
  CURRENT: 'bg-red-300',
  PLANNING: 'bg-orange-300',
  PAUSED: 'bg-amber-300',
  DROPPED: 'bg-yellow-300',
}

type StatusType = keyof typeof CLASS_NAME

const Status = ({ viewingStatus, airingStatus }: Props) => {
  const _status =
    airingStatus !== 'FINISHED'
      ? viewingStatus?.filter(item => item?.status !== 'COMPLETED')
      : viewingStatus

  const status = _status
    ?.sort((a, b) => (a?.amount && b?.amount ? b.amount - a.amount : 1))
    .slice(0, 4)

  const totalStatusCount = status?.reduce(
    (total, item) => total + (item?.amount || 0),
    0
  )

  return (
    <div className='flex flex-1 flex-col overflow-hidden rounded bg-zinc-100 text-sm dark:bg-zinc-700'>
      <div className='flex flex-1 items-center justify-center gap-x-2 py-4 lg:justify-evenly'>
        {status?.map(item => {
          if (!item) return null
          const { status, amount } = item
          if (!status || !amount) return null
          return (
            <div key={status} className='space-y-3'>
              <div
                className={classnames(
                  'py-1 px-3 text-center text-zinc-600 lg:rounded',
                  CLASS_NAME[status as StatusType]
                )}>
                {toStartCase(status)}
              </div>
              <div className='text-center'>{amount} Users</div>
            </div>
          )
        })}
      </div>
      <div className='mt-auto flex h-4'>
        {status?.map(item => {
          if (!item) return null
          const { status, amount } = item
          if (!status || !amount) return null
          const percentage = (amount * 100) / (totalStatusCount || 1)
          return (
            <div
              key={status}
              style={{
                width: `${percentage}%`,
              }}
              className={CLASS_NAME[status as StatusType]}
              aria-label={`${status} ${Math.round(percentage)}%`}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Status
