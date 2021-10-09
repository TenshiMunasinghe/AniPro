import classnames from 'classnames'
import { useParams } from 'react-router-dom'
import gqlRequestClient from '../../../api/graphqlClient'
import { useOverviewQuery } from '../../../generated/index'
import { ParamTypes } from '../../../pages/media/Media'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import Character from '../Character/Character'
import Content from '../Content/Content'
import Episode from '../Episode./Episode'
import peopleStyles from '../People/People.module.scss'
import Person from '../Person/Person'
import Recommendations from '../Recommendations/Recommendations'
import Relation from '../Relation/Relation'
import Review from '../Review/Review'
import Scores from '../Scores/Scores'
import Status from '../Status/Status'
import styles from './Overview.module.scss'

const Overview = () => {
  const { id } = useParams<ParamTypes>()
  const { data, isLoading } = useOverviewQuery(
    gqlRequestClient,
    {
      id: parseInt(id),
    },
    { select: res => res.Media }
  )

  if (isLoading) return <LoadingSpinner isCenter={{ x: true, y: false }} />

  if (!data) return null

  return (
    <div className={styles.container}>
      {(data.relations?.edges?.length || -1) > 0 && (
        <Content heading='Relations'>
          <div
            className={classnames(styles.relations, {
              [styles.collapsed]: (data.relations?.edges?.length || 0) > 4,
            })}>
            {data.relations?.edges &&
              data.relations?.edges?.map(edge => {
                if (!edge) return null

                const { node, relationType } = edge
                if (!node || !relationType) return null
                return (
                  <Relation
                    key={'relation' + node.id}
                    id={node.id}
                    image={node.coverImage?.large}
                    title={node.title?.romaji}
                    format={node.format}
                    status={node.status}
                    relation={relationType}
                    isCollapsed={(data.relations?.edges?.length || 0) > 4}
                    type={node.type || null}
                  />
                )
              })}
          </div>
        </Content>
      )}

      {(data.characters?.edges?.length || -1) > 0 && (
        <Content heading='Characters'>
          <div className={peopleStyles.people}>
            {data.characters?.edges?.map(character => (
              <Character
                character={character}
                key={'overview character' + character?.node?.id}
              />
            ))}
          </div>
        </Content>
      )}

      {(data.staff?.edges?.length || -1) > 0 && (
        <Content heading='Staff'>
          <div className={peopleStyles.people}>
            {data.staff?.edges?.map(staff => (
              <Person
                name={staff?.node?.name?.full}
                image={staff?.node?.image?.large}
                info={staff?.role}
                key={'overview staff' + staff?.node?.id + staff?.role}
              />
            ))}
          </div>
        </Content>
      )}

      {data.stats && (
        <div className={styles.stats}>
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
      )}

      {(data.streamingEpisodes?.length || -1) > 0 && (
        <Content heading='Watch'>
          <div className={styles.watch}>
            {data.streamingEpisodes?.slice(0, 4).map(episode => (
              <Episode key={'overview' + episode?.url} episode={episode} />
            ))}
          </div>
        </Content>
      )}

      {data.trailer && (
        <Content heading='Trailer'>
          <div className={styles.trailer}>
            <iframe
              title='Trailer'
              src={`https://www.${data.trailer?.site}.com/embed/${data.trailer?.id}`}
            />
          </div>
        </Content>
      )}

      {(data.recommendations?.nodes?.length || -1) > 0 && (
        <Recommendations recommendations={data?.recommendations?.nodes} />
      )}

      {(data.reviews?.nodes?.length || -1) > 0 && (
        <Content heading='Reviews'>
          <div className={styles.reviews}>
            {data.reviews?.nodes?.map(review => (
              <Review key={'overview review' + review?.id} review={review} />
            ))}
          </div>
        </Content>
      )}
    </div>
  )
}

export default Overview
