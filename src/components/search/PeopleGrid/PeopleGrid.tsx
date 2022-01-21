import React from 'react'
import { Link } from 'react-router-dom'
import {
  SearchCharactersQuery,
  SearchStaffQuery,
} from '../../../generated/index'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'
import NotFound from '../../common/NotFound/NotFound'
import { PeopleHeading } from '../PeopleSearchResult/StaffSearchResult'
import Person from '../Person/Person'
import styles from './PeopleGrid.module.scss'

type PersonType =
  | NonNullable<NonNullable<SearchStaffQuery['Page']>['staff']>[number]
  | NonNullable<
      NonNullable<SearchCharactersQuery['Page']>['characters']
    >[number]

interface Props {
  people?: PersonType[] | null
  heading?: PeopleHeading
  isLoading: boolean
  type: 'character' | 'staff'
}

const PeopleGrid = ({ people, heading, isLoading, type }: Props) => {
  return (
    <div className={styles.container}>
      {heading && (
        <Link to={heading.link} className={styles.heading}>
          <h6>{heading.text}</h6>
        </Link>
      )}
      {isLoading ? (
        <LoadingSpinner />
      ) : people?.length ? (
        <div className={styles.people}>
          {people.map(
            person =>
              person && <Person key={person.id} person={person} type={type} />
          )}
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  )
}

export default PeopleGrid
