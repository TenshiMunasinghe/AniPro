import { useParams } from 'react-router-dom'
import gqlRequestClient from '../../api/graphqlClient'
import { useWatchQuery } from '../../generated'
import { ParamTypes } from '../../pages/Media'
import LoadingSpinner from '../common/LoadingSpinner'
import Episode from './Episode'

const Episodes = () => {
  const { id } = useParams<ParamTypes>()
  const { data, isLoading } = useWatchQuery(gqlRequestClient, {
    id: parseInt(id),
  })

  if (isLoading) return <LoadingSpinner isCenter={{ x: true, y: false }} />

  if (!data?.Media?.streamingEpisodes) return null

  return (
    <div className='grid gap-y-5 lg:grid-cols-3 lg:gap-4'>
      {data.Media.streamingEpisodes.map(episode =>
        episode ? (
          <Episode key={'watch' + episode?.url} episode={episode} />
        ) : null
      )}
    </div>
  )
}

export default Episodes
