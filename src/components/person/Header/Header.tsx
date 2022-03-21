import { NO_IMAGE_URL } from '../../../api/queries'
import { CharacterInfoQuery, StaffInfoQuery } from '../../../generated/index'
import { formatDate } from '../../../utils/formatDate'
import SpoilerName from '../../character/SpoilerName'
import Description from './Description'
import Item from './Item'

export type PersonPageHeaderData =
  | CharacterInfoQuery['Character']
  | StaffInfoQuery['Staff']

type Props = { data: PersonPageHeaderData }

const Header = ({ data }: Props) => {
  if (!data || !data.name) return null

  const { name, image, description, ...infos } = data

  const { full, native, alternative, ...spoilerNames } = name

  return (
    <header className='grid gap-y-5 lg:justify-start lg:gap-x-16 lg:grid-areas-person-header'>
      <div className='relative space-y-2 pt-20 text-center after:absolute after:inset-y-0 after:-left-[100vw] after:hidden after:w-[200vw] after:bg-zinc-50 after:content-[""] dark:after:bg-zinc-700 lg:pt-20 lg:pb-10 lg:text-left lg:grid-in-names lg:after:block'>
        <h1 className='relative z-10 text-4xl leading-none'>{name?.full}</h1>
        <div className='relative z-10 space-x-2'>
          <span>
            {[name.native, ...(name.alternative || [])]
              .filter(name => name)
              .join(', ')}
          </span>
          {Object.values(spoilerNames).map(alterNativeSpoiler =>
            alterNativeSpoiler.map((name: string) => (
              <SpoilerName key={name} name={name} />
            ))
          )}
        </div>
      </div>
      <figure className='z-10 rounded-sm lg:h-full lg:pt-16 lg:grid-in-image'>
        <img
          src={image?.large || NO_IMAGE_URL}
          alt={name?.full || 'no image'}
          className='m-auto'
        />
      </figure>
      <div className='lg:grid-in-bio'>
        {infos.dateOfBirth &&
          Object.values(infos.dateOfBirth).every(val => val !== null) && (
            <Item label='Date of Birth' value={formatDate(infos.dateOfBirth)} />
          )}

        {infos.age &&
          (infos.age.toString().slice(-1) === '-' ? (
            <Item
              label='Initial Age'
              value={infos.age.toString().slice(0, -1)}
            />
          ) : (
            <Item label='Age' value={infos.age.toString()} />
          ))}

        {infos.gender && <Item label='Gender' value={infos.gender} />}

        {infos.bloodType && <Item label='Blood Type' value={infos.bloodType} />}

        <Description description={description} />
      </div>
    </header>
  )
}

export default Header
