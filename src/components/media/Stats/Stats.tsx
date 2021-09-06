import { useParams } from 'react-router-dom'
import gqlRequestClient from '../../../api/graphqlClient'
import { useStatsQuery } from '../../../generated/index'
import { ParamTypes } from '../../../pages/media/Media'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import Content from '../../media/Content/Content'
import LineChart from '../LineChart/LineChart'
import Ranking from '../Ranking/Ranking'
import Scores from '../Scores/Scores'
import Status from '../Status/Status'
import styles from './Stats.module.scss'

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
    <div className={styles.container}>
      <Content heading='Rankings'>
        <div className={styles.rankings}>
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
