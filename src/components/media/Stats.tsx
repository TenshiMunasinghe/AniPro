import { useParams } from 'react-router-dom'
import gqlRequestClient from '../../api/graphqlClient'
import { useStatsQuery } from '../../generated/index'
import { ParamTypes } from '../../pages/Media'
import LoadingSpinner from '../common/LoadingSpinner'
import Content from './Content'
import LineChart from './LineChart'
import Ranking from './Ranking'
import Scores from './Scores'
import Status from './Status'

const Stats = () => {
  const { id } = useParams<ParamTypes>()
  const { data, isLoading } = useStatsQuery(
    gqlRequestClient,
    { id: parseInt(id) },
    { select: res => res.Media }
  )

  if (isLoading) return <LoadingSpinner isCenter={{ x: true, y: false }} />

  if (!data) return null

  const sortedTrends = data.trends?.nodes?.sort((a, b) =>
    a?.date && b?.date ? a.date - b.date : 0
  )

  const sortedEpisodeTrends = data.episodeTrends?.nodes
    ?.filter(trend => typeof trend?.episode === 'number')
    .sort((a, b) => (a?.episode && b?.episode ? a.episode - b.episode : 0))

  return (
    <div className='space-y-6'>
      <Content heading='Rankings'>
        <div className='grid gap-y-4 lg:grid-cols-3 lg:gap-x-4'>
          {data.rankings?.map(ranking => (
            <Ranking key={ranking?.id} ranking={ranking} />
          ))}
        </div>
      </Content>

      {sortedTrends && (
        <Content heading='Recent Activity Per Day'>
          <LineChart
            labels={sortedTrends.map(trend =>
              trend?.date
                ? `${new Date((trend?.date || 0) * 1000).getDate()}th`
                : null
            )}
            data={sortedTrends.map(trend => trend?.trending)}
          />
        </Content>
      )}

      {sortedEpisodeTrends && (
        <Content heading='Airing Score Progression'>
          <LineChart
            labels={sortedEpisodeTrends.map(trend => trend?.episode)}
            data={sortedEpisodeTrends.map(trend => trend?.averageScore)}
          />
        </Content>
      )}

      {sortedEpisodeTrends && (
        <Content heading='Airing Watchers Progression'>
          <LineChart
            labels={sortedEpisodeTrends.map(trend => trend?.episode)}
            data={sortedEpisodeTrends.map(trend => trend?.inProgress)}
          />
        </Content>
      )}

      <Content heading='Status Distribution'>
        <Status
          viewingStatus={data.stats?.statusDistribution}
          airingStatus={data.status}
        />
      </Content>

      <Content heading='Score Distribution'>
        <Scores scores={data.stats?.scoreDistribution} />
      </Content>
    </div>
  )
}

export default Stats
