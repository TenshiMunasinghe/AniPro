import { useParams } from 'react-router-dom'
import { useAnimeStaff } from '../../../../hooks/useAnimeStaff'
import { ParamTypes } from '../../../../pages/media/Media'
import LoadingSpinner from '../../../common/LoadingSpinner/LoadingSpinner'
import Person from '../../Person/Person'
import styles from '../People.module.scss'

const Staff = () => {
  const { id } = useParams<ParamTypes>()
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useAnimeStaff(id)

  if (!data) return null

  return (
    <div className={styles.container}>
      {data.pages.map(staff =>
        staff.edges.map(staff => (
          <Person
            name={staff.node.name.full}
            image={staff.node.image.large}
            info={staff.role}
            key={'staff' + staff.node.id}
          />
        ))
      )}
      {!isFetchingNextPage && hasNextPage && (
        <button className={styles.loadMore} onClick={() => fetchNextPage()}>
          Load More!
        </button>
      )}
      {isFetchingNextPage && <LoadingSpinner />}
    </div>
  )
}

export default Staff
