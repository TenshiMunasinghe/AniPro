import range from 'lodash/range'
import { SearchCharactersQuery, SearchStaffQuery } from '../../generated/index'
import CardLoading from '../common/Cards/CardLoading/CardLoading'
import Link from '../common/Link/Link'
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
    <div className='flex flex-col justify-center space-y-3'>
      {heading && (
        <Link to={heading.link} className='flex justify-between'>
          <h6 className='text-lg uppercase'>{heading.text}</h6>
          <span className='text-sm'>View More</span>
        </Link>
      )}

      <div className='grid grid-cols-3 gap-4 lg:grid-cols-6 lg:gap-5'>
        {isLoading ? (
          range(0, 6).map((_, i) => (
            <CardLoading type='cover' key={i + 'loading-skeleton-people'} />
          ))
        ) : !!people?.length ? (
          people.map(
            person =>
              person && <Person key={person.id} person={person} type={type} />
          )
        ) : (
          <NotFound />
        )}
      </div>
    </div>
  )
}

export default PeopleGrid
