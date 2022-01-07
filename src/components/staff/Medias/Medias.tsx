import classnames from 'classnames'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import gqlRequestClient from '../../../api/graphqlClient'
import { useStaffRoleCountsQuery } from '../../../generated/index'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import Characters from './Characters/Characters'
import styles from './Medias.module.scss'
import StaffRoles from './StaffRoles/StaffRoles'

const Medias = () => {
  const { id } = useParams<{ id: string }>()
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
    <div className={styles.container}>
      {characterCount && staffCount && (
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
      {role === 'voiceActor' && <Characters />}
      {role === 'staff' && <StaffRoles />}
    </div>
  )
}

export default Medias
