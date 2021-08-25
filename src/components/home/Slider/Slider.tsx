import gqlRequestClient from '../../../api/graphqlClient'
import {
  SearchResultQueryVariables,
  useSearchResultQuery,
} from '../../../generated/index'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import Slide from '../Slide/Slide'
import styles from './Slider.module.scss'

interface Props {
  queryVar: SearchResultQueryVariables
}

const Slider = ({ queryVar }: Props) => {
  const { data, isLoading } = useSearchResultQuery(gqlRequestClient, {
    ...queryVar,
    perPage: 5,
  })
  return (
    <div className={styles.container}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && data?.Page?.media && data.Page.media.length > 0 && (
        <>
          {data?.Page?.media?.map(media =>
            media ? <Slide media={media} key={media.id} /> : null
          ) || null}
        </>
      )}
    </div>
  )
}

export default Slider
