import { NO_IMAGE_URL } from '../../../api/queries'
import { CharacterInfoQuery, StaffInfoQuery } from '../../../generated/index'
import { formatDate } from '../../../utils/formatDate'
import SpoilerName from '../../character/SpoilerName/SpoilerName'
import Description from './Description/Description'
import Item from './Item/Item'

export type PersonPageHeaderData =
  | CharacterInfoQuery['Character']
  | StaffInfoQuery['Staff']

type Props = { data: PersonPageHeaderData }

const Header = ({ data }: Props) => {
  if (!data || !data.name) return null

  const { name, image, description, ...infos } = data

  const { full, native, alternative, ...spoilerNames } = name

  return (
    <header className='grid gap-y-5 lg:justify-start lg:gap-x-5 lg:grid-areas-person-header'>
      <div className='relative pb-5 pt-7 text-center after:absolute after:inset-y-0 after:-left-[100vw] after:-z-10 after:w-[200vw] after:bg-zinc-50 after:content-[""] after:dark:bg-zinc-700 lg:text-left lg:grid-in-names'>
        <h5 className='text-4xl'>{name?.full}</h5>
        <div className='space-x-2'>
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
      <img
        src={image?.large || NO_IMAGE_URL}
        alt={name?.full || 'no image'}
        className='m-auto rounded-sm lg:pt-7 lg:grid-in-image'
      />
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
