import classnames from 'classnames'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import gqlRequestClient from '../../../api/graphqlClient'
import { MediaSort, useStaffRoleCountsQuery } from '../../../generated/index'
import { useSortMedia } from '../../../hooks/useSortMedia'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import Characters from '../Characters/Characters'
import StaffRoles from '../StaffRoles/StaffRoles'
import styles from './Medias.module.scss'

export const sortByOptions = [
  { label: 'Popularity', value: MediaSort.PopularityDesc },
  { label: 'Average Score', value: MediaSort.ScoreDesc },
  { label: 'Favourites', value: MediaSort.FavouritesDesc },
  { label: 'Newest', value: MediaSort.StartDateDesc },
  { label: 'Oldest', value: MediaSort.StartDate },
  { label: 'Title', value: MediaSort.TitleRomaji },
]

const Medias = () => {
  const { id } = useParams<{ id: string }>()
  const sortProps = useSortMedia()
  const { data, isLoading } = useStaffRoleCountsQuery(gqlRequestClient, {
    id: parseInt(id),
  })
  const characterCount = data?.Staff?.characterMedia?.pageInfo?.total
  const staffCount = data?.Staff?.staffMedia?.pageInfo?.total

  const [role, setRole] = useState<'voiceActor' | 'staff'>(
    (characterCount || 0) >= (staffCount || 0) ? 'voiceActor' : 'staff'
  )

  if (isLoading) return <LoadingSpinner />

  return (
    <>
      {!!characterCount && !!staffCount && (
        <div
          className={classnames(styles.roles, {
            [styles.vaActive]: role === 'voiceActor',
            [styles.staffActive]: role === 'staff',
          })}>
          <button onClick={() => setRole('voiceActor')}>
            Voice Acting Roles
          </button>
          <button onClick={() => setRole('staff')}>Staff Roles</button>
        </div>
      )}
      {role === 'voiceActor' && <Characters {...sortProps} />}
      {role === 'staff' && <StaffRoles {...sortProps} />}
    </>
  )
}

export default Medias
