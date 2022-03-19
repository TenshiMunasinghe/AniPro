import classnames from 'classnames'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import gqlRequestClient from '../../api/graphqlClient'
import { MediaSort, useStaffRoleCountsQuery } from '../../generated/index'
import { useSortMedia } from '../../hooks/useSortMedia'
import LoadingSpinner from '../common/LoadingSpinner'
import Characters from './Characters/Characters'
import StaffRoles from './StaffRoles/StaffRoles'

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

  const [role, setRole] = useState<'voiceActor' | 'staff'>('voiceActor')

  useEffect(() => {
    setRole((characterCount || 0) >= (staffCount || 0) ? 'voiceActor' : 'staff')
  }, [characterCount, staffCount])

  if (isLoading) return <LoadingSpinner />

  const buttonTexts = [
    { role: 'voiceActor', text: 'Voice Acting Roles' },
    { role: 'staff', text: 'Staff Roles' },
  ] as const

  return (
    <>
      {!!characterCount && !!staffCount && (
        <div
          className={classnames(
            'relative mb-4 grid w-full grid-cols-2 place-content-center after:absolute after:bottom-0 after:h-px after:w-1/2 after:bg-zinc-700 after:transition-transform after:content-[""] dark:after:bg-zinc-200',
            {
              'after:translate-x-0': role === 'voiceActor',
              'after:translate-x-full': role === 'staff',
            }
          )}>
          {buttonTexts.map(({ role, text }) => (
            <h2 className='text-center' key={role + '-role-button'}>
              <button
                className='py-2 hocus:text-teal-400'
                onClick={() => setRole(role)}>
                {text}
              </button>
            </h2>
          ))}
        </div>
      )}
      {role === 'voiceActor' && <Characters {...sortProps} />}
      {role === 'staff' && <StaffRoles {...sortProps} />}
    </>
  )
}

export default Medias
