import { useParams } from 'react-router-dom'
import { useAnimeStaff } from '../../../../hooks/useAnimeStaff'
import { ParamTypes } from '../../../../pages/media/Media'
import LoadingSpinner from '../../../common/LoadingSpinner/LoadingSpinner'
import LoadMore from '../../LoadMore/LoadMore'
import Person from '../../Person/Person'
import styles from '../People.module.scss'

const Staff = () => {
  const { id } = useParams<ParamTypes>()
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
  } = useAnimeStaff(id)

  if (isLoading) return <LoadingSpinner />

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
      <LoadMore
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage || false}
        onClick={() => fetchNextPage()}
      />
    </div>
  )
}

export default Staff
