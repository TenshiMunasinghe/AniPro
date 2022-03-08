import classnames from 'classnames'
import { useParams } from 'react-router-dom'
import gqlRequestClient from '../../api/graphqlClient'
import { useOverviewQuery } from '../../generated/index'
import { ParamTypes, TabsType } from '../../pages/Media'
import Link from '../common/Link/Link'
import LoadingSpinner from '../common/LoadingSpinner'
import Character from './Character'
import Content from './Content'
import Episode from './Episode'
import Person from './Person'
import Recommendations from './Recommendations'
import Relation from './Relation'
import Review from './Review'
import Scores from './Scores'
import Status from './Status'

const Overview = () => {
  const { id, type } = useParams<ParamTypes>()
  const { data, isLoading } = useOverviewQuery(
    gqlRequestClient,
    {
      id: parseInt(id),
    },
    { select: res => res.Media }
  )

  if (isLoading) return <LoadingSpinner isCenter={{ x: true, y: false }} />

  if (!data) return null

  const tabLink = (tab: TabsType) => `/media/${type}/${id}/${tab}`

  return (
    <div className='space-y-6  overflow-x-hidden'>
      {(data.relations?.edges?.length || -1) > 0 && (
        <Content heading='Relations'>
          <div
            className={classnames(
              'grid w-full auto-cols-[85%] grid-flow-col grid-cols-none gap-x-4 overflow-x-auto [--image-width:6.5rem] lg:auto-cols-auto lg:grid-flow-row lg:grid-cols-2 lg:gap-y-4',
              {
                'lg:grid-cols-[repeat(auto-fit,var(--image-width))]':
                  (data.relations?.edges?.length || 0) > 4,
              }
            )}>
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
        <Content
          heading={
            <Link variant='underlined' to={tabLink('characters')}>
              Characters
            </Link>
          }>
          <div className='media-content--grid'>
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
        <Content
          heading={
            <Link variant='underlined' to={tabLink('staff')}>
              Staff
            </Link>
          }>
          <div className='media-content--grid'>
            {data.staff?.edges?.map(staff => (
              <Person
                name={staff?.node?.name?.full}
                image={staff?.node?.image?.large}
                info={staff?.role}
                type='Staff'
                key={'overview staff' + staff?.node?.id + staff?.role}
              />
            ))}
          </div>
        </Content>
      )}

      {data.stats && (
        <div className='grid gap-y-6 lg:grid-cols-2 lg:gap-y-0 lg:gap-x-6'>
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
        <Content
          heading={
            <Link variant='underlined' to={tabLink('watch')}>
              Watch
            </Link>
          }>
          <div className='grid gap-y-4 overflow-x-auto lg:grid-cols-4 lg:grid-rows-1 lg:gap-5'>
            {data.streamingEpisodes?.slice(0, 4).map(episode => (
              <Episode key={'overview' + episode?.url} episode={episode} />
            ))}
          </div>
        </Content>
      )}

      {data.trailer && (
        <Content heading='Trailer'>
          <div className='aspect-video w-full'>
            <iframe
              className='h-full w-full'
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
        <Content
          heading={
            <Link variant='underlined' to={tabLink('reviews')}>
              Reviews
            </Link>
          }>
          <div className='media-content--grid'>
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
