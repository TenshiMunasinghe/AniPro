import { SearchCharactersQuery, SearchStaffQuery } from '../../generated/index'
import Link from '../common/Link/Link'
import LoadingSpinner from '../common/LoadingSpinner'
import NotFound from '../common/NotFound/NotFound'
import { PeopleHeading } from './PeopleSearchResult/StaffSearchResult'
import Person from './Person/Person'

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
    <div className='space-y-3'>
      {heading && (
        <Link to={heading.link} className='block text-lg uppercase'>
          <h6>{heading.text}</h6>
        </Link>
      )}
      {isLoading ? (
        <LoadingSpinner />
      ) : people?.length ? (
        <div className='grid grid-cols-3 gap-4 lg:grid-cols-6 lg:gap-5'>
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
