import { NO_IMAGE_URL } from '../../../api/queries'
import { CharacterInfoQuery, StaffInfoQuery } from '../../../generated/index'
import { formatDate } from '../../../utils/formatDate'
import SpoilerName from '../../character/SpoilerName/SpoilerName'
import Item from './Item/Item'
import PersonDescription from './PersonDescription/PersonDescription'
import styles from './PersonPageHeader.module.scss'

type Props = { data: CharacterInfoQuery['Character'] | StaffInfoQuery['Staff'] }

const PersonPageHeader = ({ data }: Props) => {
  if (!data || !data.name) return null

  const { name, image, description, ...infos } = data

  const { full, native, alternative, ...spoilerNames } = name

  return (
    <header className={styles.container}>
      <div className={styles.names}>
        <h5 className={styles.mainName}>{name?.full}</h5>
        <div className={styles.otherNames}>
          <span>{[name.native, ...(name.alternative || [])].join(', ')}</span>
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
        className={styles.image}
      />
      <div className={styles.bio}>
        {infos.dateOfBirth && (
          <Item label='Date of Birth' value={formatDate(infos.dateOfBirth)} />
        )}

        {infos.age && <Item label='Age' value={infos.age.toString()} />}

        {infos.gender && <Item label='Gender' value={infos.gender} />}

        {infos.bloodType && <Item label='Blood Type' value={infos.bloodType} />}

        <PersonDescription description={description} />
      </div>
    </header>
  )
}

export default PersonPageHeader
