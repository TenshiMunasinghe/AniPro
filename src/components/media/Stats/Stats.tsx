import { useParams } from 'react-router-dom'
import { useAnimeStats } from '../../../hooks/useAnimeStats'
import { ParamTypes } from '../../../pages/media/Media'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import Content from '../../media/Content/Content'
import Activities from '../Activities/Activities'
import Ranking from '../Ranking/Ranking'
import Scores from '../Scores/Scores'
import Status from '../Status/Status'
import styles from './Stats.module.scss'

const Stats = () => {
  const { id } = useParams<ParamTypes>()
  const { data, isLoading } = useAnimeStats(id)

  if (isLoading) return <LoadingSpinner />

  if (!data) return null

  return (
    <div className={styles.container}>
      <Content heading='Rankings'>
        <div className={styles.rankings}>
          {data.rankings.map(ranking => (
            <Ranking key={ranking.id} ranking={ranking} />
          ))}
        </div>
      </Content>

      <Content heading='Recent Activity Per Day'>
        <Activities activities={data.trends.nodes} />
      </Content>

      <Content heading='Status Distribution'>
        <Status
          viewingStatus={data.stats.statusDistribution}
          airingStatus={data.status}
        />
      </Content>

      <Content heading='Score Distribution'>
        <Scores scores={data.stats.scoreDistribution} />
      </Content>
    </div>
  )
}

export default Stats
