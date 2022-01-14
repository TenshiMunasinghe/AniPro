import { NO_IMAGE_URL } from '../../../api/queries'
import { CharacterInfoQuery, StaffInfoQuery } from '../../../generated/index'
import { formatDate } from '../../../utils/formatDate'
import SpoilerName from '../../character/SpoilerName/SpoilerName'
import Description from './Description/Description'
import styles from './Header.module.scss'
import Item from './Item/Item'

type Props = { data: CharacterInfoQuery['Character'] | StaffInfoQuery['Staff'] }

const Header = ({ data }: Props) => {
  if (!data || !data.name) return null

  const { name, image, description, ...infos } = data

  const { full, native, alternative, ...spoilerNames } = name

  return (
    <header className={styles.container}>
      <div className={styles.names}>
        <h5 className={styles.mainName}>{name?.full}</h5>
        <div className={styles.otherNames}>
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
      <figure className={styles.image}>
        <img
          src={image?.large || NO_IMAGE_URL}
          alt={name?.full || 'no image'}
        />
      </figure>
      <div className={styles.bio}>
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
