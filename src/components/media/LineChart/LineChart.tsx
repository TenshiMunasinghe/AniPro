import ChartistGraph from 'react-chartist'
const ctPointLabels = require('chartist-plugin-pointlabels')

interface Props {
  labels: (string | number | null | undefined)[]
  data: (number | null | undefined)[]
  hasPointLabel?: boolean
}

const orderOf = (num: number) => Math.floor(Math.log10(num))

const LineChart = ({
  labels: _labels,
  data: _data,
  hasPointLabel = true,
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
        className: 'stroke-teal-400',
      },
    ],
  }

  const max = Math.max(...data)
  const min = Math.min(...data)

  return (
    <ChartistGraph
      type='Line'
      data={activityData}
      options={
        {
          plugins: hasPointLabel && [ctPointLabels({ textAnchor: 'start' })],
          axisY: {
            low: Math.floor(
              Math.floor(min / 10 ** (orderOf(min) - 1)) *
                10 ** (orderOf(min) - 1) -
                10 ** (orderOf(min) - 1)
            ),
            high: Math.ceil(
              Math.floor(max / 10 ** (orderOf(max) - 1)) *
                10 ** (orderOf(max) - 1) +
                10 ** (orderOf(max) - 1)
            ),
            onlyInteger: true,
          },
        } as any
      }
      className='overflow-x-auto whitespace-nowrap bg-zinc-100 p-4 pb-0 pr-0 text-[length:11px] dark:bg-zinc-700'
    />
  )
}

export default LineChart
